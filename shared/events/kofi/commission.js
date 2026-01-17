import { PLATFORM_ICONS } from "../../platforms.js";

export function KofiCommissionAdapter(data) {
    const user = data.from_name || "Someone";
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
        avatar: PLATFORM_ICONS.kofi,
        raw: data
    };
}