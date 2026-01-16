import { GetAvatar } from "../../utils/helpers.js";

export async function TwitchRaidAdapter(data) {
    const username = data.from_broadcaster_user_login;

    return {
        platform: "twitch",
        type: "raid",
        subtype: "",
        tags: ["twitch", "raid"],
        username,
        description: `is raiding with a party of ${data.viewers}`,
        attribute: "",
        message: "",
        avatar: await GetAvatar(username, "twitch"),
        raw: data
    };
}