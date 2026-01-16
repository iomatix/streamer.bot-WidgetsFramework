export function CrowdControlEffectFailureAdapter(data) {
    const username = data.user?.name || "Someone";
    const effect = data.effect?.name || "an effect";

    return {
        platform: "crowdcontrol",
        type: "effect",
        subtype: "failure",
        tags: ["crowdcontrol", "effect", "failure"],
        username,
        description: `effect failed`,
        attribute: effect,
        message: "",
        avatar: "",
        raw: data
    };
}