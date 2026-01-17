import { GetAvatar } from "../../utils/helpers.js";

export async function TwitchChatMessageAdapter(data) {
    const username =
        data.message?.displayName ||
        data.message?.username ||
        data.user?.name ||
        data.user?.login ||
        "UnknownUser";


    return {
        platform: "twitch",
        type: "chat",
        subtype: "",
        tags: ["twitch", "chat"],
        username,
        description: "",
        attribute: "",
        badges: data.message?.badges || [],
        color: data.message?.color || null,
        message: {
            raw: data.text || data.message?.message,
            parts: data.parts || data.message?.parts || []
        },
        avatar: await GetAvatar(username, "twitch"),
        raw: data
    };
}
