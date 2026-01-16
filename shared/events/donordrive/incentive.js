export function DonorDriveIncentiveAdapter(data) {
    const username = data.donorName || "Someone";
    const incentive = data.incentiveName || "an incentive";
    const amount = data.amount || 0;
    const currency = data.currency || "USD";

    const formattedAmount =
        currency === "USD"
            ? `$${amount}`
            : `${amount} ${currency}`;

    return {
        platform: "donordrive",
        type: "incentive",
        subtype: "",
        tags: ["donordrive", "incentive"],
        username,
        description: `contributed to an incentive`,
        attribute: `${incentive} (${formattedAmount})`,
        message: "",
        avatar: "",
        raw: data
    };
}