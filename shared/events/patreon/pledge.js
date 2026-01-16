export function PatreonPledgeCreatedAdapter(data) {
    const username = data.user?.name || "Someone";
    const amount = data.amount_cents / 100;
    const currency = data.currency || "USD";
    const tier = data.tier_name || "";
    const avatarURL = data.user?.avatar || "icons/platforms/patreon.png";

    const formattedAmount =
        currency === "USD"
            ? `$${amount}`
            : `${amount} ${currency}`;

    return {
        platform: "patreon",
        type: "pledge",
        subtype: "",
        tags: ["patreon", "pledge"],
        username,
        description: `pledged ${formattedAmount}`,
        attribute: tier,
        message: "",
        avatar: avatarURL,
        raw: data
    };
}