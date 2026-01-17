import { PLATFORM_ICONS } from "../../platforms.js";

export function KofiDonationAdapter(data) {
    const user = data.from_name || "Someone";
    const amount = data.amount;
    const currency = data.currency;
    const message = data.message || "";

    const description =
        currency === "USD"
            ? `donated $${amount}`
            : `donated ${currency} ${amount}`;

    return {
        platform: "kofi",
        type: "donation",
        subtype: "",
        tags: ["kofi", "donation"],
        username: user,
        description,
        attribute: "",
        message,
        avatar: PLATFORM_ICONS.kofi,
        raw: data
    };
}