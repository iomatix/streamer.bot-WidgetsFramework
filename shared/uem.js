export function normalizeEvent(raw) {
    const event = raw?.data || raw;

    if (!event) return null;

    const platform = event.platform || "twitch";
    const username = event.username || event.user || "Unknown";

    let description = "";
    let type = "";

    if (event.event === "Follow" || event.type === "follow") {
        type = "follow";
        description = "followed";
    }

    if (event.event === "Sub" || event.type === "sub") {
        type = "sub";
        description = "subscribed";
    }

    if (event.event === "Cheer" || event.type === "cheer") {
        type = "cheer";
        description = `cheered ${event.amount || ""}`;
    }

    return {
        platform,
        type,
        username,
        description,
        raw: event
    };
}