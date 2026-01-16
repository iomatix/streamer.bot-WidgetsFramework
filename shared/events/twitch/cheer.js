import { GetAvatar, EscapeRegExp } from "../../utils/helpers.js";

export async function TwitchCheerAdapter(data) {
    let message = data.message.message;
    const username = data.message.displayName;

    for (const emote of data.emotes) {
        const img = `<img src="${emote.imageUrl}" class="emote"/>`;
        const name = EscapeRegExp(emote.name);
        message = message.replace(new RegExp(`\\b${name}\\b`, "g"), img);
    }

    return {
        platform: "twitch",
        type: "cheer",
        subtype: "",
        tags: ["twitch", "cheer"],
        username,
        description: `cheered ${data.bits} bits`,
        attribute: "",
        message,
        avatar: await GetAvatar(username, "twitch"),
        raw: data
    };
}