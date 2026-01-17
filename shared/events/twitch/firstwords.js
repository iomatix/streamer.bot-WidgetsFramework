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
        message: data.message.message,
        avatar: await GetAvatar(username, "twitch"),
        raw: data
    };
}
