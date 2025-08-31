## Demo Video

Check out a quick demo of the app here: [https://www.youtube.com/shorts/HtPNqZvxRhg](https://www.youtube.com/shorts/HtPNqZvxRhg)

---

# My Work — React Native (Expo)

A mobile application to organize personal work items, built with React Native (Expo) and TypeScript. This project focuses on cohesive design, responsive interactions, and reliable local persistence.

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
- [Implemented Features](#implemented-features)
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

---

## Overview

This mobile application was developed to help organize personal tasks and work items. Built with React Native using Expo and TypeScript, the project aims to offer a fluid and efficient user experience, focusing on intuitive design, responsive interactions, and the ability to reliably persist data locally. Ideal for those looking for a simple and effective tool to manage their daily activities.

---

## Highlights

- Animated completion flow with optimistic UI.
- "Undo" toast with a pill-shaped button and a progress bar that fills from left to right.
- Filters: **All**, **Today**, **Overdue**.
- Non-task tabs display a centered **Coming soon** message.
- Local persistence with **AsyncStorage**.
- SVG icon set and consistent header + top tabs with an animated indicator.

---

## Tech Stack

The project was built using the following technologies and libraries:

- **React Native (Expo)**: The main framework for developing cross-platform mobile applications, enabling the creation of rich and performant user interfaces.
- **TypeScript**: A superset of JavaScript that adds static typing, improving code maintainability, error detection during development, and team collaboration.
- **Context API**: Used for global state management, facilitating data sharing between components without the need for prop drilling.
- **AsyncStorage**: An asynchronous, persistent, and unencrypted local storage solution for React Native, ideal for storing user data offline.
- **React Native `Animated`**: A native React Native library for creating fluid and high-performance animations, used for micro-animations in the interface.
- **SVGR**: A tool that allows importing SVG files directly as React components, facilitating the integration of scalable and customizable vector graphics.

---

## Implemented Features

The application offers the following main functionalities:

- **Header**: Displays a personalized greeting, notification icons, and a filter selector for tasks.
- **Top Tabs**: Organizes content into different categories: Tasks, Reminders, Meetings, and Notes.
- **Task List**: Presents tasks in individual cards, each containing:
  - A purple check glyph at the beginning of the card body.
  - A metadata row with folder and calendar icons.
  - An "Overdue" badge with a red dot and a label for overdue tasks.
  - A completion button on the right side with a check animation and an expanding ring.
- **Completion Flow**: An interactive experience for marking tasks as complete:
  - Check and ring animation upon completion.
  - The task card fades, slides up, and collapses its height, closing the gap in the list.
  - A toast appears with an "Undo" button and a progress bar.
  - The "Undo" option restores the task; the toast timeout permanently deletes it from storage.
- **Filters**: Allows viewing tasks in different ways:
  - **All**: Displays all active tasks.
  - **Today**: Shows tasks due on the current day.
  - **Overdue**: Displays active tasks that are overdue.
- **Non-Task Tabs**: The Reminders, Meetings, and Notes tabs display a "Coming soon" message as a placeholder.

---

## Architecture & Decisions

The project's architecture was designed for modularity and scalability, with the following key decisions:

- **Feature-Oriented Components**: The interface is divided into reusable components focused on specific functionalities, such as `Header`, `TabsBar`, `TaskCard`, `Toast`, `AddTaskSheet`, and `BottomBar`. This promotes separation of concerns and facilitates maintenance.
- **Global State with `TasksContext`**: Global state management is centralized in `TasksContext`, which encapsulates task manipulation operations (`addTask`, `markComplete`, `revertComplete`, `deleteTask`, `reorderTasks`). This approach simplifies data flow and ensures state consistency throughout the application.
- **Optimistic Completion and Undo Function**: For a smoother user experience, task completion is optimistic, meaning the UI is updated immediately before persistence confirmation. A pending deletion ID is kept in a reference, allowing the "Undo" function to revert completion. The toast timeout is responsible for finalizing the deletion from state and storage.
- **Date Encapsulation**: Date manipulation logic, including determining "today," "tomorrow," "yesterday," and overdue rules, is encapsulated in dedicated utilities. This ensures consistency and facilitates future modifications or internationalization.
- **Animations**: Animations are implemented using React Native's `Animated`. For transformations and opacity, the native driver is used for better performance. However, height collapse uses a non-native driver due to API constraints, ensuring functionality even with this limitation.

---

## Data Model

The data model for a `Task` is defined as follows:

```typescript
interface Task {
  id: string;
  title: string;
  context?: string;
  dueAt?: string;
  completed: boolean;
  position: number;
}
```

- `id`: Unique task identifier (string).
- `title`: Task title (string).
- `context?`: Optional task context (string).
- `dueAt?`: Optional task due date (string, ISO 8601 format).
- `completed`: Boolean indicating whether the task has been completed.
- `position`: Number for task ordering in the list.

---

## Project Structure

The project directory structure is organized to promote modularity and clarity:

```
src/
  components/         # Reusable UI components
    Header.tsx
    TabsBar.tsx
    TaskCard.tsx
    Toast.tsx
    FAB.tsx
    AddTaskSheet.tsx
    BottomBar.tsx
  context/            # React contexts for global state management
    TasksContext.tsx
  screens/            # Main application screens
    MyWorkScreen.tsx
  theme/              # Theme definitions, such as colors
    colors.ts
  utils/              # Utility functions and helpers
    date.ts
assets/               # Static assets, such as SVG icons
  home.svg
  work.svg
  insights.svg
  profile.svg
  bell.svg
  clock.svg
  folder.svg
  calendar.svg
  check.svg
  chevron-down.svg
```

---

## Styling & Design System

The project follows a design system to ensure visual consistency and ease of maintenance:

- **Centralized Color Palette**: All colors are defined in a centralized palette (`theme/colors.ts`), facilitating global changes and ensuring brand consistency.
- **SVG Icons**: Icons are stored as SVG files in `assets/` and sized as needed in each component, ensuring scalability and sharpness at different resolutions.
- **Top Tabs**: The top tabs indicator is aligned with the label width and positioned above the divider, providing clear and visually appealing navigation.
- **Completion Button**: The completion button has a green background, a thin border, and a brand-colored check icon, offering clear visual feedback to the user.

---

## Installation & Running

To set up and run the project locally, follow the steps below:

1.  **Clone the repository:**
    ```bash
    git clone <REPOSITORY_URL>
    cd my-work-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the Expo application:**
    ```bash
    expo start
    ```
    This will open the Metro Bundler in your browser. You can scan the QR code with the Expo Go app on your mobile device or use an emulator.

---

## Required Dependencies

Make sure you have the following dependencies installed:

- `@react-native-async-storage/async-storage`: For local data persistence.

To install, run:

```bash
expo install @react-native-async-storage/async-storage
```

---

## Build & Release (Expo EAS)

To build and release the application using Expo Application Services (EAS):

1.  **Install the EAS CLI globally:**
    ```bash
    npm install -g eas-cli
    ```
2.  **Log in to EAS:**
    ```bash
    eas login
    ```
3.  **Configure the EAS project:**

    ```bash
    eas init
    ```

    Follow the instructions in the terminal to configure your EAS project. This will create an `eas.json` file.

4.  **Build the application:**
    ```bash
    eas build -p android # for Android
    eas build -p ios    # for iOS
    ```
    Or for both platforms:
    ```bash
    eas build
    ```

---

## Usage Walkthrough

Follow this guide to understand how to use the application:

1.  **Open the app**: Upon launch, the default tab is "Tasks."
2.  **Add a task**: Tap the `+` button to add a new task. You can set an optional context and a due date/time.
3.  **Complete a task**: Tap the green button to mark a task as complete.
    - A check and ring animation will appear, and the task card will fade and collapse.
    - A "Toast" will be displayed with the "Undo" option. Tap to restore the task or wait for the timeout for it to be permanently deleted.
4.  **Filter tasks**: Use the filter menu to switch between "All," "Today," and "Overdue."
5.  **Navigate between tabs**: Switch between the top tabs. Non-task tabs (Reminders, Meetings, Notes) will display the "Coming soon" message.

---

## Persistence & Undo Behavior

- All data mutations are persisted to `AsyncStorage` under a single key, ensuring that the application state is saved consistently.
- When completing a task, the `completed` property is set to `true`.
- The "Undo" function (activated before the toast timeout) resets `completed` to `false`, restoring the task.
- After the toast timeout, the task is permanently deleted, and the positions of the remaining tasks are reindexed to maintain order.

---

## Date & Overdue Rules

- **Today**: A task is considered "Today" if its due date is equal to the current local date.
- **Overdue**: A task is marked as "Overdue" if its due date is earlier than the current date and time and it is not yet completed.
- **UI**: The user interface displays an "Overdue" badge with a red dot and a label in the task card's metadata row, visually alerting the user.

---

## Accessibility & Interaction

The application was designed with a focus on accessibility and intuitive interactions:

- **Minimum Hit Area**: Header icons and filters have a minimum hit area to facilitate interaction, especially on mobile devices.
- **Visual Feedback**: Press feedback with subtle transforms is provided to indicate user interactions.
- **Animated Removal**: The animated removal of tasks preserves visual context and scroll position, providing a smooth and continuous user experience.

---

## Known Limitations / Next Steps

Some known limitations and potential future improvements include:

- **Drag Reordering**: The drag-and-drop task reordering functionality can be implemented using libraries such as `react-native-reanimated` or `draggable-flatlist`.
- **Native Date/Time Pickers**: Replace current ISO inputs with native operating system date and time pickers for a better user experience.
- **Internationalization and Time Zones**: Consider using libraries like `date-fns` or `luxon` for better internationalization (i18n) and time zone handling support.
- **Comprehensive Tests**: Add unit and integration tests for date utilities, context actions, and animation presence, ensuring the application's robustness and reliability.

---

### Contribution

Contributions are welcome! Feel free to open issues or pull requests.

### License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

**Developed by Manus AI**
