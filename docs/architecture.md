# Architecture – Streamer.bot Widgets Framework

This document describes the internal architecture of the **Streamer.bot Widgets Framework**, including data flow, core modules, and rendering logic. The goal of this architecture is to provide a clean, extensible, and predictable system for real-time alert and widget rendering.

---

## Overview

The framework receives real-time events from Streamer.bot, normalizes them into a unified format, stores them in a rolling buffer, and renders them using different modes depending on URL parameters.

Key design principles:
- Single unified event model
- Clear separation of concerns
- URL-driven rendering modes
- Renderer independent from data sources

---

## Core Components

### 1. Streamer.bot WebSocket Client

- Connects to Streamer.bot via WebSocket
- Receives real-time events (alerts, chat events, system events)
- Dispatches raw payloads to platform-specific handlers

---

### 2. Event Normalizer

Each platform-specific handler (e.g. `TwitchSub`, `YouTubeSuperChat`, `KofiDonation`) converts incoming payloads into a **unified event structure**:

```js
{
  platform,     // twitch | youtube | kofi | etc.
  type,         // sub | follow | donation | chat | ...
  subtype,      // tier, gift, membership, etc.
  tags,         // array of semantic tags
  username,
  description,
  attribute,    // numeric value (amount, months, count)
  message,
  avatar,
  raw           // original payload (for debugging / extensions)
}
```

This ensures that all downstream systems operate on a consistent data model.

---

### 3. Event Buffer

A rolling buffer that stores the **last 16 normalized events**:

```js
eventBuffer = [event0, event1, ..., event15]
```

Usage:
- Indexed widgets (`?index=0`)
- List widgets (`?list=6`)
- Filtering (`?platform=…`, `?type=…`, `?tag=…`)

The buffer is always ordered from **newest → oldest**.

---

### 4. Queue System

Used **only in normal alert mode**.

Responsibilities:
- `alertQueue` stores pending alerts
- `processQueue()` guarantees sequential rendering
- Supports:
  - Classic (single alert at a time)
  - Stacked display modes

This layer isolates timing and sequencing logic from rendering.

---

### 5. Renderer

The renderer is responsible solely for visual output.

Responsibilities:
- Building DOM structures
- Applying CSS animations and transitions
- Applying platform-specific themes and gradients
- Handling avatar loading and fallback images

The renderer does **not** care about where the data comes from.

---

### 6. URL Parameter Router

Determines which rendering mode is active based on URL parameters:

| URL Params | Mode |
|----------|------|
| `?index=0` | Indexed Mode |
| `?list=6`  | List Mode |
| *(none)*   | Normal (queue-based) Mode |

This allows the same codebase to power multiple widget types.

---

## Data Flow

```
Streamer.bot
   ↓  (WebSocket)
Platform Handler
   ↓
Event Normalizer
   ↓
Event Buffer
   ├─→ Indexed Mode Renderer
   ├─→ List Mode Renderer
   └─→ Queue System → Renderer
```

---

## Rendering Modes

### 1. Normal Mode

- Default behavior
- Alerts appear in real time
- Events are queued and rendered sequentially

---

### 2. Indexed Mode (`?index=N`)

- Displays exactly one event from the buffer
- `index = 0` refers to the newest event
- No queue or timing logic involved

---

### 3. List Mode (`?list=N`)

- Displays the `N` most recent events
- Useful for event lists, history panels, and overlays

---

### 4. Filtered Mode

Events can be filtered using URL parameters:
- `platform`
- `type`
- `tag`

Filters can be combined to create highly specific widgets.

---

## UI / Visual Style

The default visual system is designed for modern stream overlays:

- Glassmorphism backgrounds
- Platform-specific gradients
- Soft outer glow
- Avatar micro-animations (entrance, pulse)
- Directional animations (slide, rise, fade)
- Smooth scale / opacity / transform transitions

All visuals are customizable via CSS variables.

---

## Extensibility

The architecture is designed to support future extensions such as:

- Chat widgets
- Event and donation lists
- Goal and progress bars
- Credits / roll screens
- Custom themes via CSS variables
- JSON-based configuration
- Multi-tag filtering *(planned)*

The unified event model ensures that new widget types can be added without modifying existing rendering logic.

