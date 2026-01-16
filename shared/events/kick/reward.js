import { GetAvatar } from "../../utils/helpers.js";

export async function KickRewardRedemptionAdapter(data) {
    const username = data.user_name;
    const rewardName = data.reward.title;
    const cost = data.reward.cost;
    const userInput = data.user_input;

    return {
        platform: "kick",
        type: "reward",
        subtype: "",
        tags: ["kick", "reward"],
        username,
        description: `${rewardName} (${cost} points)`,
        attribute: "",
        message: userInput || "",
        avatar: await GetAvatar(username, "kick"),
        raw: data
    };
}