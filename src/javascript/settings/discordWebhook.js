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

async function notifyDiscordWebhook({ platform, url, fileName, fileSizeBytes }) {
    const webhookUrl = (getSetting("discordWebhook") || "").trim();
    if (!webhookUrl) return;

    if (!isDiscordWebhookUrl(webhookUrl)) {
        console.warn(
            "discordWebhook is set but does not look like a Discord webhook URL.",
        );
        return;
    }

    const sizeMB = fileSizeBytes ? (fileSizeBytes / (1024 * 1024)).toFixed(2) : "";
    const embedColor = 0x008BFF;
    const description = [
        `Provider: **${platform}**`,
        fileName ? `File: \`${fileName}\`${sizeMB ? ` (${sizeMB} MB)` : ""}` : null,
        url ? `Link: ${url}` : null,
    ].filter(Boolean).join("\n");

    try {
        const formData = new FormData();
        formData.append("payload_json", JSON.stringify({
            embeds: [{
                title: "New upload",
                description,
                color: embedColor,
            }],
        }));
        await fetch(webhookUrl, { method: "POST", body: formData, mode: "no-cors" });
    } catch (e) {
        console.error("Discord webhook notification failed:", e);
    }
}

window.notifyDiscordWebhook = notifyDiscordWebhook;
