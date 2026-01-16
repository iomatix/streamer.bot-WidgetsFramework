export function FourthwallGiftPurchaseAdapter(data) {
    const username = data.supporter?.name || "Someone";
    const recipient = data.recipient?.name || "a viewer";
    const tier = data.tier_name || "Subscription";

    return {
        platform: "fourthwall",
        type: "giftsub",
        subtype: "",
        tags: ["fourthwall", "gift", "sub"],
        username,
        description: `gifted a subscription`,
        attribute: `to ${recipient} (${tier})`,
        message: "",
        avatar: "icons/platforms/fourthwall.png",
        raw: data
    };
}