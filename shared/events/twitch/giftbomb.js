import { GetAvatar } from "../../utils/helpers.js";

export async function TwitchGiftBombAdapter(data) {
    const username = data.user.login;
    const tier = data.sub_tier.charAt(0);

    return {
        platform: "twitch",
        type: "giftsub",
        subtype: `tier${tier}`,
        tags: ["twitch", "sub", "gift", "bomb"],
        username,
        description: `gifted ${data.recipients.length} Tier ${tier} subs!`,
        attribute: "",
        message: data.cumulative_total > 0
            ? `They've gifted ${data.cumulative_total} subs in total!`
            : "",
        avatar: await GetAvatar(username, "twitch"),
        raw: data
    };
}