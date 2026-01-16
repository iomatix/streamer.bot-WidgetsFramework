export function CrowdControlCoinExchangeAdapter(data) {
    const username = data.user?.name || "Someone";
    const coins = data.amount || 0;

    return {
        platform: "crowdcontrol",
        type: "coins",
        subtype: "exchange",
        tags: ["crowdcontrol", "coins"],
        username,
        description: `exchanged coins`,
        attribute: `${coins}`,
        message: "",
        avatar: "",
        raw: data
    };
}