export function FourthwallGiftDrawEndedAdapter(data) {
    const winner = data.winner?.name || "Someone";
    const prize = data.prize_name || "a prize";

    return {
        platform: "fourthwall",
        type: "giftdraw",
        subtype: "end",
        tags: ["fourthwall", "giftdraw", "end"],
        username: winner,
        description: `won the gift draw!`,
        attribute: prize,
        message: "",
        avatar: "icons/platforms/fourthwall.png",
        raw: data
    };
}