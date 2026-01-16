export function TikTokSubscribeAdapter(data) {
    const username = data.uniqueId || "Someone";

    return {
        platform: "tiktok",
        type: "sub",
        subtype: "",
        tags: ["tiktok", "sub"],
        username,
        description: `subscribed`,
        attribute: "",
        message: "",
        avatar: data.profilePictureUrl || "",
        raw: data
    };
}