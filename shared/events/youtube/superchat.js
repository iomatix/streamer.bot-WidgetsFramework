export function YouTubeSuperChatAdapter(data) {
    const username = data.user.name;
    const amount = data.amount;
    const message = data.message || "";
    const avatarURL = data.user.profileImageUrl;

    return {
        platform: "youtube",
        type: "superchat",
        subtype: "",
        tags: ["youtube", "superchat"],
        username,
        description: `sent a Super Chat (${amount})`,
        attribute: "",
        message,
        avatar: avatarURL,
        raw: data
    };
}