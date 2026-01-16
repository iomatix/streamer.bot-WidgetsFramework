import { GetAvatar } from "../../utils/helpers.js";

export async function TwitchFollowAdapter(data) {
    return {
        platform: "twitch",
        type: "follow",
        subtype: "",
        tags: ["twitch", "follow"],
        username: data.user_name,
        description: "followed",
        attribute: "",
        message: "",
        avatar: await GetAvatar(data.user_name, "twitch"),
        raw: data
    };
}