export function YouTubeGiftMembershipReceivedAdapter(data) {
    const gifter = data.gifter.name;
    const recipient = data.user.name;
    const tier = data.tier;
    const avatarURL = data.user.profileImageUrl;

    return {
        platform: "youtube",
        type: "sponsorsub",
        subtype: "gift",
        tags: ["youtube", "sub", "gift"],
        username: gifter,
        description: `gifted a membership`,
        attribute: `to ${recipient} (${tier})`,
        message: "",
        avatar: avatarURL,
        raw: data
    };
}