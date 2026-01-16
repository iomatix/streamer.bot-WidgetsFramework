import { GetAvatar } from "../../utils/helpers.js";

export async function KickKicksGiftedAdapter(data) {
    const username = data.user.name;
    const amount = data.amount;

    return {
        platform: "kick",
        type: "kicks",
        subtype: "",
        tags: ["kick", "kicks"],
        username,
        description: `sent ${amount} kicks`,
        attribute: "",
        message: "",
        avatar: await GetAvatar(username, "kick"),
        raw: data
    };
}