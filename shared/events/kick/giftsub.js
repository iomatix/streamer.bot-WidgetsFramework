import { GetAvatar } from "../../utils/helpers.js";

export async function KickGiftSubscriptionAdapter(data) {
    const username = data.user.name;
    const recipient = data.recipient?.name || "someone";

    return {
        platform: "kick",
        type: "giftsub",
        subtype: "",
        tags: ["kick", "sub", "gift"],
        username,
        description: "gifted a subscription",
        attribute: `to ${recipient}`,
        message: "",
        avatar: await GetAvatar(username, "kick"),
        raw: data
    };
}