## Widget API – Streamer.bot Widgets Framework
────────────────────────────────────────────

This document explains how widgets communicate with the framework
using URL parameters.

Widget Types
────────────

1. Alert Widget (default)
   Real-time alert display (classic / stacked mode)

2. Indexed Widget
   Shows exactly one event from the buffer

   Example:
   alerts/index.html?index=0

3. List Widget
   Shows N most recent events

   Example:
   alerts/index.html?list=6

4. Filtered Widgets
   Shows events matching given criteria

   Examples:
   alerts/index.html?platform=twitch
   alerts/index.html?type=sub
   alerts/index.html?tag=gift

Combining Parameters
────────────────────

You can freely combine filters:

alerts/index.html?list=5&platform=twitch&type=sub&tag=gift

Widget Rendering Lifecycle
──────────────────────────

1. Parse URL parameters
2. Filter the event buffer accordingly
3. Select appropriate rendering mode
4. Build DOM structure
5. Apply CSS animations & transitions
6. Display the final widget

Creating New Widgets
────────────────────

To add your own custom widget:

1. Create folder:  /widgets/your-widget-name/
2. Add at minimum:
   • index.html
   • script.js
   • style.css
3. Use the shared event buffer + filtering system
4. Render using the same unified event model

OBS / Streamlabs Integration
────────────────────────────

Add Browser Source pointing to:

http://127.0.0.1:8181/alerts/?index=0
http://127.0.0.1:8181/alerts/?list=6
http://127.0.0.1:8181/alerts/?platform=twitch&type=raid

(or any other combination of parameters)