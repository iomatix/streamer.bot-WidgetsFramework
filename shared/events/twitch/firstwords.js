import { GetAvatar } from "../../utils/helpers.js";

export async function TwitchFirstWordsAdapter(data) {
    return {
        platform: "twitch",
        type: "firstwords",
        subtype: "",
        tags: ["twitch", "chat", "firstwords"],
        username: data.displayName,
        description: "sent their first message!",
        attribute: "",
        message: data.message,
        avatar: await GetAvatar(data.userName, "twitch"),
        raw: data
    };
}