# Widget API – Streamer.bot Widgets Framework

This document describes how widgets interact with the framework at runtime.

The Widget API focuses on **widget types, rendering lifecycle, and integration patterns**.

> Detailed URL parameter behavior is documented separately in `parameters.md`.

---

## Widget Types

### 1. Alert Widget (Default)

- Real-time alert display
- Uses the internal alert queue
- Supports classic (single) and stacked display modes
- Triggered when **no rendering parameters** are provided

**Typical usage:**
```
/alerts/
```

---

### 2. Indexed Widget

Displays **exactly one event** from the event buffer.

- Uses the `index` parameter
- `index = 0` always refers to the most recent event
- No queue or timing logic

**Example:**
```
/alerts/?index=0
```

---

### 3. List Widget

Displays the **N most recent events** from the event buffer.

- Uses the `list` parameter
- Events are rendered simultaneously
- Commonly used for activity feeds and history panels

**Example:**
```
/alerts/?list=6
```

---

### 4. Filtered Widgets

Any widget type can be filtered using URL parameters.

Filters can be applied by:
- platform
- event type
- semantic tags

**Examples:**
```
/alerts/?platform=twitch
/alerts/?type=sub
/alerts/?tag=gift
```

Filters can be freely combined with rendering modes.

---

## Widget Rendering Lifecycle

Each widget follows the same rendering pipeline:

1. Parse URL parameters
2. Read from the shared event buffer
3. Apply filters (platform → type → tag)
4. Select rendering mode (alert / index / list)
5. Build DOM structure
6. Apply CSS styles and animations
7. Display the final widget output

This guarantees consistent behavior across all widget types.

---

## Creating Custom Widgets

To create your own widget using the framework:

1. Create a new folder:
   ```
   /widgets/your-widget-name/
   ```

2. Add the minimum required files:
   - `index.html`
   - `script.js`
   - `style.css`

3. Use the shared:
   - event buffer
   - filtering logic
   - unified event model

4. Render content using your own layout and animations

Custom widgets automatically benefit from all existing platforms and events.

---

## OBS / Streamlabs Integration

Widgets are embedded using a **Browser Source**.

Point the source to your local widget server, for example:

```
http://127.0.0.1:8181/alerts/?index=0
http://127.0.0.1:8181/alerts/?list=6
http://127.0.0.1:8181/alerts/?platform=twitch&type=raid
```

Any valid combination of rendering and filtering parameters is supported.

---

## Design Notes

- Widgets are stateless and URL-driven
- Rendering logic is fully decoupled from data sources
- All widgets operate on the same unified event model
- New widget types can be added without modifying the core framework

This API is intentionally minimal to keep widgets predictable, reusable, and easy to maintain.
