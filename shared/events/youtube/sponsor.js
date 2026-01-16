export function YouTubeNewSponsorAdapter(data) {
    const username = data.user.name;
    const level = data.levelName;
    const avatarURL = data.user.profileImageUrl;

    return {
        platform: "youtube",
        type: "sponsorsub",
        subtype: "",
        tags: ["youtube", "sub"],
        username: `⭐ New ${level}`,
        description: `Welcome ${username}!`,
        attribute: "",
        message: "",
        avatar: avatarURL,
        raw: data
    };
}