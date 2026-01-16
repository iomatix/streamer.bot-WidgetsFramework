import { GetAvatar } from "../../utils/helpers.js";

export async function TwitchSubAdapter(data) {
    const username = data.user.name;
    const tier = data.sub_tier.charAt(0);
    const subtype = data.is_prime ? "prime" : `tier${tier}`;

    return {
        platform: "twitch",
        type: "sub",
        subtype,
        tags: ["twitch", "sub", subtype],
        username,
        description: data.is_prime
            ? "used their Prime Sub"
            : `subscribed with Tier ${tier}`,
        attribute: "",
        message: "",
        avatar: await GetAvatar(username, "twitch"),
        raw: data
    };
}