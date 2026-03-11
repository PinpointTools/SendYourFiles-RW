function isDiscordWebhookUrl(url) {
    try {
        const u = new URL(url);
        if (u.protocol !== "https:") return false;
        const allowedHosts = new Set([
            "discord.com",
            "discordapp.com",
            "canary.discord.com",
            "ptb.discord.com",
        ]);
        if (!allowedHosts.has(u.hostname)) return false;
        return u.pathname.startsWith("/api/webhooks/");
    } catch {
        return false;
    }
}

async function notifyDiscordWebhook({ platform, url, fileName, fileSizeBytes, failed, causeError }) {
    const webhookUrl = (getSetting("discordWebhook") || "").trim();
    if (!webhookUrl) return;

    if (!isDiscordWebhookUrl(webhookUrl)) {
        console.warn(
            "discordWebhook is set but does not look like a Discord webhook URL.",
        );
        return;
    }

    const sizeMB = fileSizeBytes ? (fileSizeBytes / (1024 * 1024)).toFixed(2) : "";
    let title = "";
    let description = "";
    let embedColor = 0x008BFF;

    if (!failed) {
        title = "New Upload";
        description = [
            `Provider: **${platform}**`,
            fileName ? `File: \`${fileName}\`${sizeMB ? ` (${sizeMB} MB)` : ""}` : null,
            url ? `Link: ${url}` : null,
        ].filter(Boolean).join("\n");
    } else {
        title = "Upload Failed";
        description = [
            `Provider: **${platform}**`,
            fileName ? `File: \`${fileName}\`${sizeMB ? ` (${sizeMB} MB)` : ""}` : null,
            causeError ? `Cause of error: \`${causeError}\`` : null,
        ].filter(Boolean).join("\n");
        embedColor = 0xFF0000;
    }

    try {
        const formData = new FormData();
        formData.append("payload_json", JSON.stringify({
            embeds: [{
                title: title,
                description,
                color: embedColor,
            }],
        }));
        await fetch(webhookUrl, { method: "POST", body: formData, mode: "no-cors" });
        console.log("Discord webhook notification sent!")
    } catch (e) {
        console.error("Discord webhook notification failed:", e);
    }
}

window.notifyDiscordWebhook = notifyDiscordWebhook;
