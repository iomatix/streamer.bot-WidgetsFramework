# Architecture – Streamer.bot Widgets Framework

This document describes the internal architecture of the **Streamer.bot Widgets Framework**, including data flow, core modules, and rendering logic.

The goal of this architecture is to provide a **clean, extensible, and predictable system** for real-time alert and widget rendering.

---

## Overview

The framework receives real-time events from Streamer.bot, normalizes them into a unified format, stores them in a rolling buffer, and renders them using different modes depending on URL parameters.

### Key Design Principles

- Unified event model for all platforms
- Clear separation of concerns
- URL-driven rendering modes
- Renderer independent from data sources
- Stateless widgets controlled entirely by URL parameters

---

## Core Components

### 1. Streamer.bot WebSocket Client

Responsible for connecting to Streamer.bot via WebSocket.

- Receives real-time events
- Dispatches raw payloads to platform-specific adapters
- Performs **no transformation or normalization**

This component acts purely as a transport layer.

---

### 2. Platform Adapters (Event Normalizers)

Each platform-specific adapter converts incoming payloads into the **Unified Event Model (UEM)**.

This guarantees that all downstream systems operate on a consistent data structure.

#### Unified Event Model (UEM)

```js
{
  platform,
  type,
  subtype,
  tags,
  username,
  description,
  attribute,
  message,
  avatar,
  raw
}
```

The UEM ensures predictable rendering, filtering, and long-term extensibility.

---

### 3. Event Buffer

A rolling buffer that stores the **last N normalized events** (default: `16`).

- Newest event is always at index `0`
- Buffer is continuously updated

Used by:
- Indexed widgets (`?index=0`)
- List widgets (`?list=6`)
- Filtered widgets (`?platform=…`, `?type=…`, `?tag=…`)

The buffer is updated regardless of the active rendering mode.

---

### 4. Queue System (Alert Mode Only)

Used **only when no rendering parameters are provided**.

Responsibilities:
- Manages timing and sequencing of alerts
- Ensures deterministic alert playback

Supported modes:
- **Classic** – one alert at a time, sequential
- **Stacked** – multiple alerts visible simultaneously

The queue system is completely isolated from rendering logic.

---

### 5. Renderer

Responsible **only for visual output**.

The renderer:
- Builds DOM structures
- Applies CSS classes and animations
- Applies platform-specific themes and gradients
- Handles avatar loading and fallbacks
- Renders alerts, indexed widgets, and list widgets

The renderer does **not** know or care where events originate.

---

### 6. URL Parameter Router

Determines which rendering mode is active based on URL parameters.

#### Rendering Modes

- `index=N` → Indexed Mode
- `list=N` → List Mode
- *(none)* → Normal Alert Mode

#### Filtering Parameters

- `platform`
- `type`
- `tag`

The router ensures widgets are stateless and fully controlled by URL parameters.

---

## Data Flow

```text
Streamer.bot
   ↓
WebSocket Client
   ↓
Platform Adapter
   ↓
Unified Event Model
   ↓
Event Buffer
   ├─→ Indexed / List Renderer
   └─→ Queue → Renderer
```

---

## Rendering Modes

### Normal Mode

- Default behavior
- Alerts appear in real time
- Uses the alert queue

---

### Indexed Mode (`?index=N`)

- Displays exactly one event from the buffer
- No queue or timing logic involved

---

### List Mode (`?list=N`)

- Displays the `N` most recent events
- Commonly used for activity feeds and history widgets

---

### Filtered Mode

Events can be filtered by:
- platform
- type
- tag

Filters can be combined with any rendering mode.

---

## UI & Visual Style

The default visual system uses:

- Glassmorphism backgrounds
- Platform-specific gradients
- Soft glow shadows
- Avatar micro-animations
- Directional entrance animations
- Smooth transitions

All visuals are customizable via **CSS variables**.

---

## Extensibility

The architecture supports future extensions such as:

- Chat widgets
- Event lists
- Goal widgets
- Credits screens
- Custom themes
- JSON-based configuration
- Multi-tag filtering *(planned)*

Thanks to the unified event model, new widget types can be added **without modifying existing core logic**.
