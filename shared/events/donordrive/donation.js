export function DonorDriveDonationAdapter(data) {
    const username = data.donorName || "Someone";
    const amount = data.amount || 0;
    const message = data.message || "";
    const currency = data.currency || "USD";

    const formattedAmount =
        currency === "USD"
            ? `$${amount}`
            : `${amount} ${currency}`;

    return {
        platform: "donordrive",
        type: "donation",
        subtype: "",
        tags: ["donordrive", "donation"],
        username,
        description: `donated ${formattedAmount}`,
        attribute: "",
        message,
        avatar: "",
        raw: data
    };
}