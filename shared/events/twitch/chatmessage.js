import { GetAvatar } from "../../utils/helpers.js";

export async function TwitchChatMessageAdapter(data) {
    return {
        platform: "twitch",
        type: "chat",
        subtype: "",
        tags: ["twitch", "chat"],
        username: data.displayName,
        description: "",
        attribute: "",
        message: data.message,
        avatar: await GetAvatar(data.userName, "twitch"),
        raw: data
    };
}