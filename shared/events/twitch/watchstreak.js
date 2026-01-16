import { GetAvatar } from "../../utils/helpers.js";

export async function TwitchWatchStreakAdapter(data) {
    return {
        platform: "twitch",
        type: "watchstreak",
        subtype: "",
        tags: ["twitch", "watchstreak"],
        username: data.displayName,
        description: `is currently on a ${data.watchStreak} stream streak!`,
        attribute: "",
        message: "",
        avatar: await GetAvatar(data.userName, "twitch"),
        raw: data
    };
}