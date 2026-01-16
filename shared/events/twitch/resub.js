import { GetAvatar } from "../../utils/helpers.js";

export async function TwitchResubAdapter(data) {
    const username = data.user.name;
    const tier = data.subTier.charAt(0);
    const subtype = data.isPrime ? "prime" : `tier${tier}`;

    return {
        platform: "twitch",
        type: "resub",
        subtype,
        tags: ["twitch", "sub", "resub", subtype],
        username,
        description: data.isPrime
            ? "used their Prime Sub"
            : `resubscribed with Tier ${tier}`,
        attribute: `${data.cumulativeMonths} months`,
        message: data.text || "",
        avatar: await GetAvatar(username, "twitch"),
        raw: data
    };
}