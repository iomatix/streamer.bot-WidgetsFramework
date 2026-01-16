import { GetAvatar } from "../../utils/helpers.js";

export async function KickSubscriptionAdapter(data) {
    const username = data.user.name;

    return {
        platform: "kick",
        type: "sub",
        subtype: "",
        tags: ["kick", "sub"],
        username,
        description: "subscribed",
        attribute: "",
        message: "",
        avatar: await GetAvatar(username, "kick"),
        raw: data
    };
}