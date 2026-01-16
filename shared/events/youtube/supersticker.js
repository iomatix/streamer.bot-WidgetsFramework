export function YouTubeSuperStickerAdapter(data) {
    const username = data.user.name;
    const amount = data.amount;
    const avatarURL = data.user.profileImageUrl;

    return {
        platform: "youtube",
        type: "supersticker",
        subtype: "",
        tags: ["youtube", "supersticker"],
        username,
        description: `sent a Super Sticker (${amount})`,
        attribute: "",
        message: "",
        avatar: avatarURL,
        raw: data
    };
}