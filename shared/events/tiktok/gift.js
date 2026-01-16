export function TikTokGiftAdapter(data) {
    const username = data.uniqueId || "Someone";
    const giftName = data.giftName || "a gift";
    const amount = data.diamondCount || 0;

    return {
        platform: "tiktok",
        type: "gift",
        subtype: "",
        tags: ["tiktok", "gift"],
        username,
        description: `sent a gift`,
        attribute: `${giftName} (${amount} diamonds)`,
        message: "",
        avatar: data.profilePictureUrl || "",
        raw: data
    };
}