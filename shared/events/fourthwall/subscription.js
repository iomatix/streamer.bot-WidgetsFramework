export function FourthwallSubscriptionPurchasedAdapter(data) {
    const username = data.supporter?.name || "Someone";
    const tier = data.tier_name || "Subscription";

    return {
        platform: "fourthwall",
        type: "sub",
        subtype: "",
        tags: ["fourthwall", "sub"],
        username,
        description: `purchased a subscription`,
        attribute: tier,
        message: "",
        avatar: "icons/platforms/fourthwall.png",
        raw: data
    };
}