export function StreamElementsTipAdapter(data) {
    const username = data.username || "Someone";
    const amount = data.amount;
    const currency = data.currency || "$";
    const message = data.message || "";

    const formattedAmount =
        currency === "$"
            ? `$${amount}`
            : `${currency}${amount}`;

    return {
        platform: "streamelements",
        type: "donation",
        subtype: "",
        tags: ["streamelements", "donation"],
        username,
        description: `donated ${formattedAmount}`,
        attribute: "",
        message,
        avatar: "", // SE does not provide avatar
        raw: data
    };
}