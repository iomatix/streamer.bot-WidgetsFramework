export function StreamlootsTipAdapter(data) {
    const username = data.username || "Someone";
    const amount = data.amount || 0;
    const currency = data.currency || "$";

    const formattedAmount =
        currency === "$"
            ? `$${amount}`
            : `${amount} ${currency}`;

    return {
        platform: "streamloots",
        type: "donation",
        subtype: "",
        tags: ["streamloots", "donation"],
        username,
        description: `tipped ${formattedAmount}`,
        attribute: "",
        message: data.message || "",
        avatar: data.avatar || "",
        raw: data
    };
}