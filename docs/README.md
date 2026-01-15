# Streamer.bot Widgets Framework – Documentation

This directory contains the official documentation for the **Streamer.bot Widgets Framework**.
It explains how events are processed, normalized, filtered, and rendered.

---

## Documentation Structure

The documentation is split into focused files to keep each topic clear and maintainable.

---

## Recommended Reading Order

### 1. Architecture
**`architecture.md`**  
Internal modules, data flow, rendering logic, and design principles.

### 2. Event Matrix
**`event-matrix.md`**  
Complete taxonomy of supported platforms, event types, subtypes, and tags.

### 3. URL Parameters
**`parameters.md`**  
All supported URL parameters, filtering rules, and rendering modes.

### 4. Widget API
**`widget-api.md`**  
Widget types, rendering lifecycle, and integration patterns.

---

## Design Philosophy

The framework is built around:

- One unified event model for all platforms
- URL-driven, stateless widgets
- Clear separation of data, logic, and rendering
- Easy extensibility without breaking existing widgets

---

## Adding New Documentation

When extending the framework, new documentation should:

- Live inside the `docs/` directory
- Focus on a single responsibility
- Avoid duplicating existing content
- Reference other documents instead of restating them

---

## Planned Documentation

Future documents may include:

- Theme and styling system
- Animation and transition reference
- Goal and progress widgets
- Chat widgets
- Configuration schema

If you find missing information or unclear sections,
feel free to open an issue or submit a pull request.
