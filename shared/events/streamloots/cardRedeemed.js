export function StreamlootsCardRedeemedAdapter(data) {
    const username = data.redeemer?.username || "Someone";
    const card = data.card?.name || "a card";
    const message = data.message || "";

    return {
        platform: "streamloots",
        type: "card",
        subtype: "redeemed",
        tags: ["streamloots", "card", "redeemed"],
        username,
        description: `redeemed a card`,
        attribute: card,
        message,
        avatar: data.redeemer?.avatar || "",
        raw: data
    };
}