import { GetAvatar } from "../../utils/helpers.js";

export async function KickResubscriptionAdapter(data) {
    const username = data.user.name;
    const months = data.months || data.cumulativeMonths || 0;

    return {
        platform: "kick",
        type: "resub",
        subtype: "",
        tags: ["kick", "sub", "resub"],
        username,
        description: "resubscribed",
        attribute: `${months} months`,
        message: "",
        avatar: await GetAvatar(username, "kick"),
        raw: data
    };
}