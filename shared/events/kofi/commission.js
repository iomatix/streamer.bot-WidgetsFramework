export function KofiCommissionAdapter(data) {
    const user = data.from || "Someone";
    const amount = data.amount;
    const currency = data.currency;
    const message = data.message || "";
    const tier = data.tier_name || "a commission";

    const description =
        currency === "USD"
            ? `commissioned you ($${amount})`
            : `commissioned you (${currency} ${amount})`;

    return {
        platform: "kofi",
        type: "commission",
        subtype: "",
        tags: ["kofi", "commission"],
        username: user,
        description,
        attribute: tier,
        message,
        avatar: "icons/platforms/kofi.png",
        raw: data
    };
}