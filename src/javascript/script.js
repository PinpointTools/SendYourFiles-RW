let selectedFile = null;
let selectedSize = 0;
window.selectedFile = selectedFile;
window.selectedSize = selectedSize;

async function loadPopups() {
  const popups = [
    "sendTo.html",
    "credits.html",
    "about.html",
    "settings.html",

    "extra/sendTo-Fallback.html",
    "extra/litterboxTime.html",

    "extra/limiter/catbox.html",
    "extra/limiter/litterbox.html",

    "extra/warning/buzzheavier-cors.html",
  ];

  for (const file of popups) {
    try {
      const url = new URL(`./src/popup/${file}`, window.location.href);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} while fetching ${url.pathname}`);
      }
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
    window.selectedFile = selectedFile;
    window.selectedSize = selectedSize;

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

window.chooseFile = chooseFile;
window.showPopup = showPopup;
window.closePopup = closePopup;
