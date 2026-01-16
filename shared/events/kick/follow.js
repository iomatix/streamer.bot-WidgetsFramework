import { GetAvatar } from "../../utils/helpers.js";

export async function KickFollowAdapter(data) {
    const username = data.user_name;

    return {
        platform: "kick",
        type: "follow",
        subtype: "",
        tags: ["kick", "follow"],
        username,
        description: "followed",
        attribute: "",
        message: "",
        avatar: await GetAvatar(username, "kick"),
        raw: data
    };
}