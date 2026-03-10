async function loadSettings() {
  const container = document.querySelector("#settingsPopup .overflow");
  if (!container) return;

  container.innerHTML = "";

  try {
    const resp = await fetch("/assets/settings.json", { cache: "no-store" });
    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status} while fetching settings.json`);
    }
    const payload = await resp.json();
    // Support either `{ settings: { ... } }` or `{ ... }`.
    const settings = payload?.settings && typeof payload.settings === "object"
      ? payload.settings
      : payload;

    if (!settings || Object.keys(settings).length === 0) {
      container.innerHTML =
        '<p style="padding: 10px; color: white;">No settings found.</p>';
      return;
    }

    for (const key in settings) {
      const item = settings[key];
      if (!item || typeof item !== "object") continue;

      if (item.type === "boolean") {
        const div = document.createElement("div");
        div.className = "item settings-item";

        const storageKey = `syf.settings.${key}`;
        const stored = localStorage.getItem(storageKey);
        const defaultBool = item.default === true || item.default === "true";
        const currentBool = stored === null ? defaultBool : stored === "true";

        const info = document.createElement("div");
        info.className = "info";

        const title = document.createElement("span");
        title.className = "bigText";
        title.textContent = item.name ?? key;

        const br = document.createElement("br");

        const desc = document.createElement("span");
        desc.textContent = item.description ?? "";

        info.appendChild(title);
        info.appendChild(br);
        info.appendChild(desc);

        const select = document.createElement("select");
        select.id = key;
        select.addEventListener("change", () => {
          saveSetting(key, select.value === "true");
        });

        const optTrue = document.createElement("option");
        optTrue.value = "true";
        optTrue.textContent = "True";
        optTrue.selected = currentBool;

        const optFalse = document.createElement("option");
        optFalse.value = "false";
        optFalse.textContent = "False";
        optFalse.selected = !currentBool;

        select.appendChild(optTrue);
        select.appendChild(optFalse);

        div.appendChild(info);
        div.appendChild(select);

        container.appendChild(div);
      } else if (item.type === "string") {
        const div = document.createElement("div");
        div.className = "item settings-item";

        const storageKey = `syf.settings.${key}`;
        const stored = localStorage.getItem(storageKey);
        const currentValue = stored === null ? (item.default ?? "") : stored;

        const info = document.createElement("div");
        info.className = "info";

        const title = document.createElement("span");
        title.className = "bigText";
        title.textContent = item.name ?? key;

        const br = document.createElement("br");

        const desc = document.createElement("span");
        desc.textContent = item.description ?? "";

        info.appendChild(title);
        info.appendChild(br);
        info.appendChild(desc);

        const input = document.createElement("input");
        input.id = key;
        input.type = "text";
        input.value = String(currentValue);
        input.addEventListener("change", () => {
          saveSetting(key, input.value);
        });

        div.appendChild(info);
        div.appendChild(input);

        container.appendChild(div);
      }
    }

    if (!container.children.length) {
      container.innerHTML =
        '<p style="padding: 10px; color: white;">No settings found.</p>';
    }
  } catch (error) {
    console.error("Failed to load settings:", error);
    container.innerHTML = "<p>Error loading settings.</p>";
  }
}

function saveSetting(key, value) {
  try {
    const storageKey = `syf.settings.${key}`;
    localStorage.setItem(storageKey, String(value));
  } catch (e) {
    console.error("Failed to save setting:", e);
  }
}

function getSetting(key) {
  try {
    return localStorage.getItem(`syf.settings.${key}`);
  } catch {
    return null;
  }
}