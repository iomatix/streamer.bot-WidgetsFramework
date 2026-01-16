export function FourthwallOrderPlacedAdapter(data) {
    const username = data.customer?.name || "Someone";
    const items = data.items?.map(i => i.name).join(", ") || "an item";
    const amount = data.total?.amount || 0;
    const currency = data.total?.currency || "USD";

    const formattedAmount =
        currency === "USD"
            ? `$${amount}`
            : `${amount} ${currency}`;

    return {
        platform: "fourthwall",
        type: "order",
        subtype: "",
        tags: ["fourthwall", "order"],
        username,
        description: `placed an order (${formattedAmount})`,
        attribute: items,
        message: "",
        avatar: "icons/platforms/fourthwall.png",
        raw: data
    };
}