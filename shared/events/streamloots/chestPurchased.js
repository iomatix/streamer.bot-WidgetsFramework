export function StreamlootsChestPurchasedAdapter(data) {
    const username = data.buyer?.username || "Someone";
    const chests = data.chests || 1;

    return {
        platform: "streamloots",
        type: "chest",
        subtype: "purchased",
        tags: ["streamloots", "chest", "purchased"],
        username,
        description: `bought ${chests} chest(s)`,
        attribute: "",
        message: "",
        avatar: data.buyer?.avatar || "",
        raw: data
    };
}