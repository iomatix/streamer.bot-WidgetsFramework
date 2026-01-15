# URL Parameters – Streamer.bot Widgets Framework

This document defines all supported **URL parameters** and how they influence widget behavior.  
Widgets are **stateless** and fully controlled by URL parameters.

---

## Core Parameters

### index
Displays **a single event** from the event buffer.  
0 refers to the most recent event.  
Disables queue logic and timing.

Examples:
- ?index=0
- ?index=3

### list
Displays the **N most recent events** from the buffer.

Examples:
- ?list=6
- ?list=12

### platform
Filters events by their **source platform**.

Examples:
- ?platform=twitch
- ?platform=youtube
- ?platform=kick

### type
Filters events by the **main event category**.

Examples:
- ?type=sub
- ?type=donation
- ?type=raid
- ?type=cheer

### tag
Filters events by a specific **semantic tag**.

Tags may represent:
- subtype (prime, gift)
- payment method (bits, superchat)
- context (raid, reward)

Examples:
- ?tag=gift
- ?tag=prime
- ?tag=bits

### excludeTag
Excludes events containing a specific tag.

Example:
- ?excludeTag=test

---

## Combining Parameters

Parameters can be **freely combined**.

Examples:
- ?list=5&platform=twitch&type=sub&tag=gift
- ?list=10&platform=youtube
- ?index=0&platform=twitch
- ?list=8&type=donation

**Filtering order:**
1. platform
2. type
3. tag
4. excludeTag
5. Rendering mode (index, list, or default)

---

## Default Behavior

If **no rendering parameter** (index or list) is provided:
- The widget runs in **normal alert mode**
- Events are displayed **in real time** using the alert queue

---

## Planned Parameters (Not Yet Implemented)

- tag=a,b,c          → Multi-tag filtering (OR)
- avatar=false       → Hide avatar completely
- animation=fade     → Force a specific entrance animation
- direction=left     → Control animation direction
- theme=dark         → Force a specific theme preset

---

## Notes

- URL parameters are **intentionally stateless**.
- Widgets can be embedded in **OBS**, **Streamlabs Desktop**, or any browser source without additional configuration.

---