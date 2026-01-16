export function StreamlootsSubscriptionAdapter(data) {
    const username = data.username || "Someone";
    const tier = data.tier || "Subscription";

    return {
        platform: "streamloots",
        type: "sub",
        subtype: "",
        tags: ["streamloots", "sub"],
        username,
        description: `subscribed`,
        attribute: tier,
        message: "",
        avatar: data.avatar || "",
        raw: data
    };
}