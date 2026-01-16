export function TipeeeStreamDonationAdapter(data) {
    const username = data.username || "Someone";
    const amount = data.amount;
    const currency = data.currency || "€";
    const message = data.message || "";

    const formattedAmount =
        currency === "$" || currency === "€"
            ? `${currency}${amount}`
            : `${amount} ${currency}`;

    return {
        platform: "tipeee",
        type: "donation",
        subtype: "",
        tags: ["tipeee", "donation"],
        username,
        description: `donated ${formattedAmount}`,
        attribute: "",
        message,
        avatar: "", // TipeeeStream does not provide avatar
        raw: data
    };
}