export function StreamlabsDonationAdapter(data) {
    const username = data.name || "Someone";
    const amount = data.amount;
    const currency = data.currency || "$";
    const message = data.message || "";

    const formattedAmount =
        currency === "$"
            ? `$${amount}`
            : `${currency}${amount}`;

    return {
        platform: "streamlabs",
        type: "donation",
        subtype: "",
        tags: ["streamlabs", "donation"],
        username,
        description: `donated ${formattedAmount}`,
        attribute: "",
        message,
        avatar: "", // Streamlabs does not provide avatar
        raw: data
    };
}