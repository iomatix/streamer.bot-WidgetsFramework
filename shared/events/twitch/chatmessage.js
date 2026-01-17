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
        message: data.message.message, // tekst wiadomości
        avatar: await GetAvatar(username, "twitch"),
        raw: data
    };
}
