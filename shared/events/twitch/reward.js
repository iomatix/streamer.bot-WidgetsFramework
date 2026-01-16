import { GetAvatar } from "../../utils/helpers.js";

export async function TwitchRewardRedemptionAdapter(data) {
    const username = data.user_name;
    const rewardName = data.reward.title;
    const cost = data.reward.cost;
    const userInput = data.user_input;

    const avatarURL = await GetAvatar(data.user_login, "twitch");

    return {
        platform: "twitch",
        type: "reward",
        subtype: "",
        tags: ["twitch", "reward"],
        username,
        description: `${rewardName} (${cost} points)`,
        attribute: "",
        message: userInput || "",
        avatar: avatarURL,
        raw: data
    };
}