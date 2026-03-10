let selectedFile = null;
let selectedSize = 0;

async function loadPopups() {
  const popups = [
    "sendTo.html",
    "credits.html",

    "extra/sendTo-Fallback.html",
    "extra/litterboxTime.html",

    "extra/limiter/catbox.html",
    "extra/limiter/litterbox.html",
  ];

  for (const file of popups) {
    try {
      const response = await fetch(`popup/${file}`);
      const html = await response.text();
      document.body.insertAdjacentHTML("beforeend", html);
      console.log(`Loaded popup: ${file}`);
    } catch (e) {
      console.error(`Failed to load ${file}:`, e);
    }
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  await loadPopups();
});

async function chooseFile() {
  const input = document.createElement("input");
  input.type = "file";

  input.onchange = () => {
    const file = input.files[0];
    if (!file) return;

    selectedFile = file;
    selectedSize = file.size;

    const fileName = file.name;
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);

    document.getElementById("logs").innerText =
      `Selected: ${fileName} (${sizeMB} MB)`;
  };

  input.click();
}

function showPopup(id) {
  if (id === "platformPopup" && !selectedFile) {
    showPopup("fallbackPopup");
    return;
  }

  if (id === "settingsPopup") {
    loadSettings();
    currentLocalVersion();
  }

  const popup = document.getElementById(id);
  if (popup) {
    popup.style.display = "flex";
  }
}

function closePopup(id) {
  const popup = document.getElementById(id);
  if (popup) {
    popup.style.display = "none";
  }
}

function startLitterboxFlow() {
  closePopup("platformPopup");
  showPopup("litterboxTimePopup");
}

function copyToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand("copy");
    return true;
  } catch (err) {
    console.error("Fallback copy failed", err);
    return false;
  } finally {
    document.body.removeChild(textArea);
  }
}

async function handleUploadSuccess(result) {
  const logPanel = document.getElementById("logs");

  if (result && typeof result === "string" && result.startsWith("http")) {
    logPanel.innerText = `Success! (Copied!)
${result}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(result);
      } catch (err) {
        console.error("Clipboard write failed, using fallback:", err);
        copyToClipboard(result);
      }
    } else {
      copyToClipboard(result);
    }
  } else {
    logPanel.innerText =
      result || "Upload completed with no result or an unknown error.";
  }
}

async function uploadFileToServer(platform, duration = null) {
  if (!selectedFile) {
    document.getElementById("logs").innerText = "Error: No file selected.";
    return;
  }

  const logPanel = document.getElementById("logs");
  logPanel.innerText = `Preparing direct upload to ${platform}${duration ? ` (${duration})` : ""}...`;

  try {
    let response;
    let result;

    if (platform === "catbox") {
      const formData = new FormData();
      formData.append("reqtype", "fileupload");
      formData.append("fileToUpload", selectedFile, selectedFile.name);
      response = await fetch("https://catbox.moe/user/api.php", {
        method: "POST",
        body: formData,
      });
      result = (await response.text()).trim();
    } else if (platform === "litterbox") {
      const formData = new FormData();
      formData.append("reqtype", "fileupload");
      formData.append("time", duration || "1h");
      formData.append("fileToUpload", selectedFile, selectedFile.name);
      response = await fetch(
        "https://litterbox.catbox.moe/resources/internals/api.php",
        {
          method: "POST",
          body: formData,
        },
      );
      result = (await response.text()).trim();
    } else if (platform === "buzzheavier") {
      const uploadURL = `https://w.buzzheavier.com/${encodeURIComponent(selectedFile.name)}`;
      response = await fetch(uploadURL, {
        method: "PUT",
        body: selectedFile,
      });

      if (response.ok) {
        const body = await response.json();
        const fileID = body?.data?.id;
        result = fileID
          ? `https://buzzheavier.com/${fileID}`
          : "Error: Could not find file ID in response.";
      } else {
        result = await response.text();
      }
    } else {
      logPanel.innerText = `Unsupported provider: ${platform}`;
      return;
    }

    if (!response.ok) {
      logPanel.innerText = `Upload failed: ${result}`;
      console.error(`Upload failed with status ${response.status}: ${result}`);
    } else {
      await handleUploadSuccess(result);
    }
  } catch (e) {
    const corsBlocked =
      e instanceof TypeError &&
      (e.message || "").toLowerCase().includes("failed to fetch");
    if (corsBlocked) {
      logPanel.innerText = `Upload blocked by provider CORS policy. This provider does not allow direct browser uploads from this site.`;
    } else {
      logPanel.innerText = `Error: Upload failed - ${e.message}`;
    }
    console.error("Fetch error:", e);
  }
}

async function litterBoxExpire(timeLabel) {
  closePopup("litterboxTimePopup");
  const time = timeLabel.split(" ")[0].toLowerCase() + "h";

  await uploadFileToServer("litterbox", time);
}

async function triggerUpload(platform) {
  const sizeMB = selectedSize / (1024 * 1024);
  const logPanel = document.getElementById("logs");

  if (!selectedFile) {
    logPanel.innerText = "Error: No file selected.";
    return;
  }

  if (platform === "catbox" && sizeMB > 200) {
    closePopup("platformPopup");
    showPopup("catboxLimiterPopup");
    return;
  }
  if (platform === "litterbox" && sizeMB > 1024) {
    closePopup("platformPopup");
    showPopup("litterboxLimiterPopup");
    return;
  }

  if (platform === "litterbox") {
    startLitterboxFlow();
    return;
  }

  closePopup("platformPopup");
  await uploadFileToServer(platform, null);
}
