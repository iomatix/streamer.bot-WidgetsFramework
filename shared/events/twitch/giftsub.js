import { GetAvatar } from "../../utils/helpers.js";

export async function TwitchGiftSubAdapter(data) {
    if (data.fromCommunitySubGift) return null;

    const username = data.user.name;
    const tier = data.subTier.charAt(0);

    return {
        platform: "twitch",
        type: "giftsub",
        subtype: `tier${tier}`,
        tags: ["twitch", "sub", "gift"],
        username,
        description: `gifted a Tier ${tier} subscription`,
        attribute: `to ${data.recipient.name}`,
        message: data.cumlativeTotal > 0
            ? `They've gifted ${data.cumlativeTotal} subs in total!`
            : "",
        avatar: await GetAvatar(username, "twitch"),
        raw: data
    };
}