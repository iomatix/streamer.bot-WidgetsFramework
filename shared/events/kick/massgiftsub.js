import { GetAvatar } from "../../utils/helpers.js";

export async function KickMassGiftSubscriptionAdapter(data) {
    const username = data.user.name;
    const count = data.total || data.recipients?.length || 0;

    return {
        platform: "kick",
        type: "giftsub",
        subtype: "mass",
        tags: ["kick", "sub", "gift", "mass"],
        username,
        description: `gifted ${count} subs`,
        attribute: "",
        message: "",
        avatar: await GetAvatar(username, "kick"),
        raw: data
    };
}