# Widget API – Streamer.bot Widgets Framework

This document describes how widgets interact with the framework at runtime.  
URL parameter behavior is documented separately in `parameters.md`.

---

## Widget Types

### 1. Alert Widget (Default)

Displays real-time alerts using the internal alert queue.  
Supports:

- Classic mode (one alert at a time)
- Stacked mode (multiple alerts visible)

Active when **no rendering parameters** are provided (`index` or `list`).

**Example:**
- alerts/

---

### 2. Indexed Widget

Displays **exactly one event** from the event buffer.  
Uses the `index` parameter.  
`index=0` always refers to the most recent event.  
No queue or timing logic is used.

**Example:**
- alerts/?index=0

---

### 3. List Widget

Displays the **N most recent events** from the event buffer.  
Uses the `list` parameter.  
All events are rendered simultaneously.

**Common use cases:**
- Activity feeds
- Event history widgets

**Example:**
- alerts/?list=6

---

### 4. Filtered Widgets

Any widget type can be filtered using URL parameters.

**Supported filters:**
- `platform`
- `type`
- `tag`
- `excludeTag`

**Examples:**
- alerts/?platform=twitch
- alerts/?type=sub
- alerts/?tag=gift
- alerts/?platform=youtube&type=donation

---

## Widget Rendering Lifecycle

All widgets follow the same pipeline:

1. Parse URL parameters  
2. Read from the shared event buffer  
3. Apply filters (`platform`, `type`, `tag`, `excludeTag`)  
4. Select rendering mode (alert / index / list)  
5. Build DOM structure  
6. Apply CSS classes, themes, and animations  
7. Display the final widget output  

This ensures consistent behavior across all widget types.

---

## Creating Custom Widgets

1. Create a new folder:  
   `widgets/your-widget-name/`

2. Add required files:  
   - `index.html`  
   - `script.js`  
   - `style.css`

3. Use shared systems:  
   - event buffer  
   - filtering logic  
   - unified event model

4. Render your own layout and animations

Custom widgets automatically support **all platforms** and **all event types**.

---

## OBS and Streamlabs Integration

Widgets are embedded using a **Browser Source**.

**Examples:**
- http://127.0.0.1:8181/widgets/alerts/?index=0
- http://127.0.0.1:8181/widgets/alerts/?list=6
- http://127.0.0.1:8181/widgets/alerts/?platform=twitch&type=raid
- http://127.0.0.1:8181/widgets/alerts/?list=10&platform=youtube

Any valid combination of rendering and filtering parameters is supported.

---

## Design Notes

- Widgets are **stateless** and **URL-driven**  
- Rendering logic is decoupled from data sources  
- All widgets operate on the **unified event model**  
- New widget types can be added without modifying the core framework

---