# Streamer.bot Widgets Framework – Documentation

Welcome to the official documentation for the **Streamer.bot Widgets Framework**.

This section contains all technical and usage-related documents describing how the framework works, how events are processed, and how widgets are rendered.

The documentation is split into focused files to avoid duplication and keep each topic easy to maintain.

---

## 📖 How to Read These Docs

If this is your first time using the framework, we recommend reading the documentation in the following order:

1. **Architecture** – understand how the system works internally
2. **Event Matrix** – see which platforms and events are supported
3. **URL Parameters** – learn how to filter and control widgets
4. **Widget API** – understand widget types and rendering lifecycle

---

## 📚 Documentation Index

### Core Concepts

- **Architecture**  
  `architecture.md`  
  Internal modules, data flow, rendering logic, and design principles

- **Unified Event Model & Event Matrix**  
  `event-matrix.md`  
  Complete list of supported platforms, event types, subtypes, and tags

---

### Widget Usage

- **URL Parameters**  
  `parameters.md`  
  All supported URL parameters, filtering rules, and rendering modes

- **Widget API**  
  `widget-api.md`  
  Widget types, rendering lifecycle, and integration patterns

---

## 🧠 Design Philosophy

- One unified event model for all platforms
- URL-driven, stateless widgets
- Clear separation between data, logic, and rendering
- Easy extensibility without breaking existing widgets

---

## 🧩 Adding New Documentation

When extending the framework, new documentation should:

- live inside the `/docs` directory
- focus on a single responsibility
- avoid duplicating information from existing files
- reference other documents instead of restating them

---

## 🔮 Planned Documentation

Future documentation may include:

- Theme and styling system
- Animation and transition reference
- Goal and progress widgets
- Chat widgets
- Configuration schema

---

If you find missing information or unclear sections, feel free to open an issue or submit a pull request.
