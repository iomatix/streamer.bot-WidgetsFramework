export function CrowdControlTimedEffectUpdateAdapter(data) {
    const effect = data.effect?.name || "an effect";
    const remaining = data.remainingSeconds || 0;

    return {
        platform: "crowdcontrol",
        type: "timed",
        subtype: "update",
        tags: ["crowdcontrol", "timed", "update"],
        username: "",
        description: `timed effect update`,
        attribute: `${effect} (${remaining}s left)`,
        message: "",
        avatar: "",
        raw: data
    };
}