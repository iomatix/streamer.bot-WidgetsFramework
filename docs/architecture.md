##Architecture – Streamer.bot Widgets Framework
──────────────────────────────────────────────

This document describes the internal architecture of the framework,
including data flow, modules and rendering logic.

Core Components
───────────────

1. Streamer.bot WebSocket Client
   Receives real-time events from Streamer.bot and normalizes them
   into the unified event model.

2. Event Normalizer
   Each platform-specific handler (TwitchSub, YouTubeSuperChat, etc.)
   converts raw payloads into the following unified structure:

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

3. Event Buffer
   Keeps the last 16 normalized events in an array:

   eventBuffer = [alert0, alert1, ..., alert15]

   Used for:
   • indexed widgets  (?index=0)
   • list widgets     (?list=6)
   • filtering        (?platform=… ?type=… ?tag=…)

4. Queue System
   Used only in normal alert mode:
   • alertQueue holds pending alerts
   • processQueue() ensures sequential display
   • supports classic and stacked display modes

5. Renderer
   Responsible for:
   • building DOM elements
   • applying CSS animations
   • applying platform-specific themes/gradients
   • handling avatar loading + fallback images

6. URL Parameter Router
   Decides which rendering mode to use:

   ?index=0   → renderIndexedEvent()
   ?list=6    → renderEventList()
   (no params) → normal alert mode (queue-based)

Data Flow
─────────

Streamer.bot
   ↓ (WebSocket)
Platform Handler
   ↓
Normalizer → Event Buffer
               ├─→ Index Mode
               ├─→ List Mode
               └─→ Queue → Renderer

Rendering Modes
───────────────

1. Normal Mode
   Alerts appear in real-time as they arrive

2. Indexed Mode  (?index=N)
   Displays exactly one event from the buffer (0 = newest)

3. List Mode     (?list=N)
   Shows N most recent events

4. Filtered Mode
   Filters events by:
   • platform
   • type
   • tag

UI / Visual Style
─────────────────

• Glassmorphism background
• Platform-specific gradients
• Soft outer glow
• Avatar micro-animations (entrance / pulse)
• Directional animations (slide, rise, etc.)
• Smooth scale / fade / slide transitions

Extensibility
─────────────

The architecture was designed to support:

• Chat widgets
• Event / donation lists
• Goal / progress bars
• Credits roll screens
• Custom themes via CSS variables
• JSON-based configuration
• Multi-tag filtering (planned)