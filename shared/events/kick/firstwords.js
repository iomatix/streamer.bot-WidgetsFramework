import { GetAvatar } from "../../utils/helpers.js";

export async function KickFirstWordsAdapter(data) {
    const username = data.displayName || data.userName;

    return {
        platform: "kick",
        type: "firstwords",
        subtype: "",
        tags: ["kick", "chat", "firstwords"],
        username,
        description: "sent their first message!",
        attribute: "",
        message: data.message,
        avatar: await GetAvatar(username, "kick"),
        raw: data
    };
}