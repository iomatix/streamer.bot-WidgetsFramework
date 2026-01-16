export function CrowdControlEffectRequestAdapter(data) {
    const username = data.user?.name || "Someone";
    const effect = data.effect?.name || "an effect";

    return {
        platform: "crowdcontrol",
        type: "effect",
        subtype: "request",
        tags: ["crowdcontrol", "effect", "request"],
        username,
        description: `requested an effect`,
        attribute: effect,
        message: "",
        avatar: "",
        raw: data
    };
}