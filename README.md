# My Work — React Native (Expo)

<p align="center"><b>Clean UI · Smooth micro-interactions · Local-first</b></p>

<p align="center">
  <img alt="Expo" src="https://img.shields.io/badge/Expo-RN-blueviolet?style=flat" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Strict-blue?style=flat" />
  <img alt="State" src="https://img.shields.io/badge/State-Context_API-success?style=flat" />
  <img alt="Storage" src="https://img.shields.io/badge/Storage-AsyncStorage-informational?style=flat" />
</p>

**Time spent:** ~2h40m

---

## Table of Contents

- [Overview](#overview)
- [Highlights](#highlights)
- [Tech Stack](#tech-stack)
- [Features Implemented](#features-implemented)
- [Architecture & Decisions](#architecture--decisions)
- [Data Model](#data-model)
- [Project Structure](#project-structure)
- [Styling & Design System](#styling--design-system)
- [Installation & Running](#installation--running)
- [Required Dependencies](#required-dependencies)
- [Build & Release (Expo EAS)](#build--release-expo-eas)
- [Usage Walkthrough](#usage-walkthrough)
- [Persistence & Undo Behavior](#persistence--undo-behavior)
- [Date & Overdue Rules](#date--overdue-rules)
- [Accessibility & Interaction](#accessibility--interaction)
- [Known Limitations / Next Steps](#known-limitations--next-steps)
- [Demo Recording](#demo-recording)
- [License](#license)

---

## Overview

Mobile app to organize personal work items. Built with React Native (Expo) and TypeScript. Focus on cohesive design, responsive interactions, and reliable local persistence.

---

## Highlights

- Animated completion flow with optimistic UI
- “Undo” toast with pill button and progress bar that fills left→right
- Filters: **All**, **Today**, **Overdue**
- Non-Tasks tabs show a centered **Coming soon**
- Local persistence with **AsyncStorage**
- SVG icon set and consistent header + top tabs with animated indicator

---

## Tech Stack

- React Native (Expo) · TypeScript
- Context API for global state
- AsyncStorage for local storage
- React Native `Animated` for micro-animations
- SVGs via SVGR

---

## Features Implemented

- **Header** with greeting, icons, and filter selector
- **Top Tabs**: Tasks, Reminders, Meetings, Notes
- **Tasks List** with cards:
  - Leading purple check glyph in the card body
  - Folder + Calendar metadata row
  - Overdue badge with red dot + label
  - Right-side completion button with animated check + expanding ring
- **Completion Flow**
  - Check + ring animation
  - Card fades, slides up, and collapses height (list closes the gap)
  - Toast with **Undo** pill and progress bar
  - Undo restores; timeout deletes from storage
- **Filters**
  - All shows every active task
  - Today shows tasks due today
  - Overdue shows active overdue tasks
- **Non-Tasks Tabs**
  - Placeholder message **Coming soon**

---

## Architecture & Decisions

- **Feature-oriented components**: `Header`, `TabsBar`, `TaskCard`, `Toast`, `AddTaskSheet`, `BottomBar`
- **Global state** in `TasksContext`
  - `addTask`, `markComplete`, `revertComplete`, `deleteTask`, `reorderTasks`
  - Snapshot persisted to AsyncStorage on every change
- **Optimistic completion + Undo**
  - Pending deletion id kept in a ref
  - Undo clears the ref and reverts completion
  - Toast timeout deletes from state and storage
- **Dates** encapsulated in utilities for today/tomorrow/yesterday and overdue logic
- **Animations**
  - Native driver for transform/opacity
  - Height collapse uses non-native driver due to API constraints

---

## Data Model

```txt
Task {
  id: string
  title: string
  context?: string
  dueAt?: string
  completed: boolean
  position: number
}
```
