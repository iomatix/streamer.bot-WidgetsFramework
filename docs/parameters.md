# URL Parameters – Streamer.bot Widgets Framework

This document defines **all supported URL parameters** and how they influence widget behavior.

The parameter system is intentionally simple: parameters control **which events are selected** and **how they are rendered**, without changing the underlying framework logic.

---

## Core Parameters

### `index`

Display a **single event** from the event buffer.

- `0` = most recent event
- Disables queue logic

**Examples:**
```
?index=0
?index=3
```

---

### `list`

Display the **N most recent events** from the buffer.

**Examples:**
```
?list=6
?list=12
```

---

### `platform`

Filter events by their source platform.

**Examples:**
```
?platform=twitch
?platform=youtube
?platform=kick
```

---

### `type`

Filter by the main event category.

**Examples:**
```
?type=sub
?type=donation
?type=raid
?type=cheer
```

---

### `tag`

Filter by a specific semantic tag.

Tags come from the unified event model and may represent:
- subtype (`prime`, `gift`)
- payment method (`bits`, `superchat`)
- context (`raid`, `reward`)

**Examples:**
```
?tag=gift
?tag=prime
?tag=bits
```

---

## Combining Parameters

Parameters can be freely combined to create highly specific widgets.

**Examples:**
```
?list=5&platform=twitch&type=sub&tag=gift
?list=10&platform=youtube
?index=0&platform=twitch
?list=8&type=donation
```

The filtering order is:
1. Platform
2. Type
3. Tag
4. Rendering mode (`index` / `list` / default)

---

## Default Behavior

If **no rendering parameter** is provided:
- The widget runs in **normal alert mode**
- Events are displayed in real time using the alert queue

---

## Planned Parameters

The following parameters are **designed but not yet implemented**:

- `tag=a,b,c` – multi-tag filtering (OR)
- `excludeTag=xyz` – exclude events with specific tags
- `avatar=false` – hide avatar completely
- `animation=fade` – force a specific entrance animation
- `direction=left` – control animation direction
- `theme=dark` – force light / dark / custom theme

---

URL parameters are intentionally stateless, making widgets easy to embed in OBS, Streamlabs Desktop, or any browser source without additional configuration.

