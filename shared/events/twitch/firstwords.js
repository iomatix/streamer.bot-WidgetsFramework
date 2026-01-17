import { GetAvatar } from "../../utils/helpers.js";

export async function TwitchFirstWordsAdapter(data) {
    const username =
        data.message?.displayName ||
        data.message?.username ||
        data.user?.name ||
        data.user?.login ||
        "UnknownUser";

    return {
        platform: "twitch",
        type: "firstwords",
        subtype: "",
        tags: ["twitch", "chat", "firstwords"],
        username,
        description: "sent their first message!",
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
