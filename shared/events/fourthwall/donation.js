export function FourthwallDonationAdapter(data) {
    const username = data.supporter?.name || "Someone";
    const amount = data.amount?.amount || 0;
    const currency = data.amount?.currency || "USD";
    const message = data.message || "";

    const formattedAmount =
        currency === "USD"
            ? `$${amount}`
            : `${amount} ${currency}`;

    return {
        platform: "fourthwall",
        type: "donation",
        subtype: "",
        tags: ["fourthwall", "donation"],
        username,
        description: `donated ${formattedAmount}`,
        attribute: "",
        message,
        avatar: "icons/platforms/fourthwall.png",
        raw: data
    };
}