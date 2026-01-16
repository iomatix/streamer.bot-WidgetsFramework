export function FourthwallGiftDrawStartedAdapter(data) {
    const prize = data.prize_name || "a prize";

    return {
        platform: "fourthwall",
        type: "giftdraw",
        subtype: "start",
        tags: ["fourthwall", "giftdraw", "start"],
        username: "",
        description: `A gift draw has started!`,
        attribute: prize,
        message: "",
        avatar: "icons/platforms/fourthwall.png",
        raw: data
    };
}