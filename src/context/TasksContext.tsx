// import React, { createContext, useEffect, useMemo, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Task } from '../types';

// type Ctx = {
//   tasks: Task[];
//   addTask: (v: { title: string; context?: string; dueAt?: string }) => void;
//   toggleComplete: (id: string) => void;
//   reorderTasks: (from: number, to: number) => void;
// };

// export const TasksContext = createContext<Ctx>({} as any);

// function uid() {
//   return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
// }

// export function TasksProvider({ children }: { children: React.ReactNode }) {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const raw = await AsyncStorage.getItem('tasks');
//       if (raw) {
//         try {
//           setTasks(JSON.parse(raw));
//         } catch {}
//       }
//       setLoaded(true);
//     })();
//   }, []);

//   useEffect(() => {
//     if (!loaded) return;
//     AsyncStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks, loaded]);

//   function addTask(v: { title: string; context?: string; dueAt?: string }) {
//     setTasks((prev) => {
//       const pos = prev.filter((t) => !t.completed).length;
//       const t: Task = {
//         id: uid(),
//         title: v.title,
//         context: v.context,
//         dueAt: v.dueAt,
//         completed: false,
//         position: pos,
//       };
//       return [...prev, t];
//     });
//   }

//   function toggleComplete(id: string) {
//     setTasks((prev) =>
//       prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
//     );
//   }

//   function reorderTasks(from: number, to: number) {
//     setTasks((prev) => {
//       const ordered = [...prev].sort(
//         (a, b) => (a.position ?? 0) - (b.position ?? 0),
//       );
//       const [m] = ordered.splice(from, 1);
//       ordered.splice(to, 0, m);
//       return ordered.map((t, i) => ({ ...t, position: i }));
//     });
//   }

//   const value = useMemo(
//     () => ({
//       tasks: [...tasks].sort((a, b) => (a.position ?? 0) - (b.position ?? 0)),
//       addTask,
//       toggleComplete,
//       reorderTasks,
//     }),
//     [tasks],
//   );

//   return (
//     <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
//   );
// }
import React, { createContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types';

type Ctx = {
  tasks: Task[];
  addTask: (v: { title: string; context?: string; dueAt?: string }) => void;
  markComplete: (id: string) => void;
  revertComplete: (id: string) => void;
  deleteTask: (id: string) => void;
  reorderTasks: (from: number, to: number) => void;
  toggleComplete: (id: string) => void;
};

export const TasksContext = createContext<Ctx>({} as any);

const STORAGE_KEY = '@tasks';

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          const parsed: Task[] = JSON.parse(raw);
          setTasks(parsed);
        } catch {}
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function addTask(v: { title: string; context?: string; dueAt?: string }) {
    setTasks((prev) => {
      const pos = prev.length;
      const t: Task = {
        id: String(Math.random()),
        title: v.title,
        context: v.context,
        dueAt: v.dueAt,
        completed: false,
        position: pos,
      };
      return [...prev, t];
    });
  }

  function markComplete(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: true } : t)),
    );
  }

  function revertComplete(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: false } : t)),
    );
  }

  function deleteTask(id: string) {
    setTasks((prev) => {
      const kept = prev.filter((t) => t.id !== id);
      return kept.map((t, i) => ({ ...t, position: i }));
    });
  }

  function reorderTasks(from: number, to: number) {
    setTasks((prev) => {
      const ordered = [...prev].sort(
        (a, b) => (a.position ?? 0) - (b.position ?? 0),
      );
      const [m] = ordered.splice(from, 1);
      ordered.splice(to, 0, m);
      return ordered.map((t, i) => ({ ...t, position: i }));
    });
  }

  function toggleComplete(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }

  const value = useMemo(
    () => ({
      tasks: [...tasks].sort((a, b) => (a.position ?? 0) - (b.position ?? 0)),
      addTask,
      markComplete,
      revertComplete,
      deleteTask,
      reorderTasks,
      toggleComplete,
    }),
    [tasks],
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
