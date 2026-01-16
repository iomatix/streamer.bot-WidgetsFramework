import { eventBuffer } from "./buffer.js";

export function filterEvents(params) {
    return eventBuffer.filter(ev => {
        if (params.platform && ev.platform !== params.platform) return false;
        if (params.type && ev.type !== params.type) return false;

        // OR tags: ?tag=a,b,c
        if (params.tag) {
            const orTags = params.tag.split(",");
            const hasAny = ev.tags?.some(t => orTags.includes(t));
            if (!hasAny) return false;
        }

        // AND tags: ?tagAll=a,b
        if (params.tagAll) {
            const andTags = params.tagAll.split(",");
            const hasAll = andTags.every(t => ev.tags?.includes(t));
            if (!hasAll) return false;
        }

        // Exclude multiple: ?excludeTag=a,b
        if (params.excludeTag) {
            const exclude = params.excludeTag.split(",");
            const hasExcluded = ev.tags?.some(t => exclude.includes(t));
            if (hasExcluded) return false;
        }

        return true;
    });
}

export function passesFilters(event, params) {
    if (params.platform && event.platform !== params.platform) return false;
    if (params.type && event.type !== params.type) return false;

    // OR tags: ?tag=a,b,c
    if (params.tag) {
        const orTags = params.tag.split(",");
        const hasAny = event.tags?.some(t => orTags.includes(t));
        if (!hasAny) return false;
    }

    // AND tags: ?tagAll=a,b
    if (params.tagAll) {
        const andTags = params.tagAll.split(",");
        const hasAll = andTags.every(t => event.tags?.includes(t));
        if (!hasAll) return false;
    }

    // Exclude multiple: ?excludeTag=a,b
    if (params.excludeTag) {
        const exclude = params.excludeTag.split(",");
        const hasExcluded = event.tags?.some(t => exclude.includes(t));
        if (hasExcluded) return false;
    }

    return true;
}
