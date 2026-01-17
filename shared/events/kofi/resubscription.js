import { PLATFORM_ICONS } from "../../platforms.js";

export function KofiResubscriptionAdapter(data) {
    const user = data.from_name || "Someone";
    const amount = data.amount;
    const currency = data.currency;
    const message = data.message || "";

    const description =
        currency === "USD"
            ? `resubscribed ($${amount})`
            : `resubscribed (${currency} ${amount})`;

    return {
        platform: "kofi",
        type: "resub",
        subtype: "",
        tags: ["kofi", "sub", "resub"],
        username: user,
        description,
        attribute: "",
        message,
        avatar: PLATFORM_ICONS.kofi,
        raw: data
    };
}