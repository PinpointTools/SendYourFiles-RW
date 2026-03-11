function startLitterboxFlow() {
  window.closePopup("platformPopup");
  window.showPopup("litterboxTimePopup");
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
  if (!window.selectedFile) {
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
      formData.append(
        "fileToUpload",
        window.selectedFile,
        window.selectedFile.name,
      );
      response = await fetch("https://catbox.moe/user/api.php", {
        method: "POST",
        body: formData,
      });
      result = (await response.text()).trim();
    } else if (platform === "litterbox") {
      const formData = new FormData();
      formData.append("reqtype", "fileupload");
      formData.append("time", duration || "1h");
      formData.append(
        "fileToUpload",
        window.selectedFile,
        window.selectedFile.name,
      );
      response = await fetch(
        "https://litterbox.catbox.moe/resources/internals/api.php",
        {
          method: "POST",
          body: formData,
        },
      );
      result = (await response.text()).trim();
    } else if (platform === "buzzheavier") {
      const uploadURL = `https://w.buzzheavier.com/${encodeURIComponent(window.selectedFile.name)}`;
      response = await fetch(uploadURL, {
        method: "PUT",
        body: window.selectedFile,
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

      await notifyDiscordWebhook({
        platform,
        fileName: window.selectedFile?.name || null,
        fileSizeBytes: window.selectedSize || null,
        failed: true,
        causeError: `${response.status}: ${result}`
      });
    } else {
      await handleUploadSuccess(result);
      if (typeof result === "string" && result.startsWith("http")) {
        await notifyDiscordWebhook({
          platform,
          url: result,
          fileName: window.selectedFile?.name || null,
          fileSizeBytes: window.selectedSize || null,
          failed: false
        });
      }
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
    await notifyDiscordWebhook({
      platform,
      fileName: window.selectedFile?.name || null,
      fileSizeBytes: window.selectedSize || null,
      failed: true,
      causeError: corsBlocked ? "CORS blocked: Failed to fetch" : (e?.message || "Unknown error"),
    });
  }
}

async function litterBoxExpire(timeLabel) {
  window.closePopup("litterboxTimePopup");
  const time = timeLabel.split(" ")[0].toLowerCase() + "h";

  await uploadFileToServer("litterbox", time);
}

async function triggerUpload(platform) {
  const sizeMB = window.selectedSize / (1024 * 1024);
  const logPanel = document.getElementById("logs");

  if (!window.selectedFile) {
    logPanel.innerText = "Error: No file selected.";
    return;
  }

  if (platform === "catbox" && sizeMB > 200) {
    window.closePopup("platformPopup");
    window.showPopup("catboxLimiterPopup");
    return;
  }
  if (platform === "litterbox" && sizeMB > 1024) {
    window.closePopup("platformPopup");
    window.showPopup("litterboxLimiterPopup");
    return;
  }

  if (platform === "litterbox") {
    startLitterboxFlow();
    return;
  }

  if (platform == "buzzheavier") {
    window.closePopup("platformPopup");
    window.showPopup("buzzheavierCORS")
    return
  }

  window.closePopup("platformPopup");
  await uploadFileToServer(platform, null);
}

window.triggerUpload = triggerUpload;
window.litterBoxExpire = litterBoxExpire;
