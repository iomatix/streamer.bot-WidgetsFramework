import { GetAvatar } from "../../utils/helpers.js";

export async function KickChatMessageAdapter(data) {
    const username = data.displayName || data.userName;

    return {
        platform: "kick",
        type: "chat",
        subtype: "",
        tags: ["kick", "chat"],
        username,
        description: "",
        attribute: "",
        message: data.message,
        avatar: await GetAvatar(username, "kick"),
        raw: data
    };
}