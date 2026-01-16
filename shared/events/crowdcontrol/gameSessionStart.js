export function CrowdControlGameSessionStartAdapter(data) {
    return {
        platform: "crowdcontrol",
        type: "session",
        subtype: "start",
        tags: ["crowdcontrol", "session", "start"],
        username: "",
        description: `CrowdControl session started`,
        attribute: "",
        message: "",
        avatar: "",
        raw: data
    };
}