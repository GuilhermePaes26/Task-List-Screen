import React, { useContext, useMemo, useRef, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { TasksContext } from '../context/TasksContext';
import { colors } from '../theme/colors';
import TaskCard from '../components/TaskCard';
import FAB from '../components/FAB';
import AddTaskSheet from '../components/AddTaskSheet';
import BottomBar from '../components/BottomBar';
import Header from '../components/Header';
import Toast from '../components/Toast';
import { isOverdue } from '../utils/date';

type Filter = 'All' | 'Today' | 'Overdue';

export default function MyWorkScreen() {
  const { tasks, addTask, markComplete, revertComplete, deleteTask } =
    useContext(TasksContext);
  const [sheet, setSheet] = useState(false);
  const [tab, setTab] = useState<'home' | 'work' | 'insights' | 'profile'>(
    'work',
  );
  const [topTab, setTopTab] = useState(0);
  const [filter, setFilter] = useState<Filter>('All');
  const [toastVisible, setToastVisible] = useState(false);
  const pendingRef = useRef<string | null>(null);

  function isTodayStr(s?: string) {
    if (!s) return false;
    const d = new Date(s);
    const n = new Date();
    return (
      d.getFullYear() === n.getFullYear() &&
      d.getMonth() === n.getMonth() &&
      d.getDate() === n.getDate()
    );
  }

  const active = useMemo(() => {
    let list = tasks.filter((t) => !t.completed);
    if (filter === 'Today') list = list.filter((t) => isTodayStr(t.dueAt));
    if (filter === 'Overdue') list = list.filter((t) => isOverdue(t.dueAt));
    return list;
  }, [tasks, filter]);

  function onDone(id: string) {
    pendingRef.current = id;
    setToastVisible(true);
    markComplete(id);
  }

  function handleUndo() {
    const id = pendingRef.current;
    if (id) revertComplete(id);
    pendingRef.current = null;
    setToastVisible(false);
  }

  function handleTimeout() {
    const id = pendingRef.current;
    if (id) deleteTask(id);
    pendingRef.current = null;
    setToastVisible(false);
  }

  const showingTasks = topTab === 0;

  return (
    <SafeAreaView style={s.safe}>
      <Header
        tabs={['Tasks', 'Reminders', 'Meetings', 'Notes']}
        activeTab={topTab}
        onTabChange={setTopTab}
        filterValue={filter}
        onChangeFilter={setFilter}
      />

      {showingTasks ? (
        <FlatList
          data={active}
          keyExtractor={(i) => i.id}
          contentContainerStyle={s.list}
          ItemSeparatorComponent={() => <View style={s.sep} />}
          renderItem={({ item }) => (
            <TaskCard task={item} onToggle={() => onDone(item.id)} />
          )}
        />
      ) : (
        <View style={s.placeholder}>
          <Text style={s.placeholderText}>Coming soon...</Text>
        </View>
      )}

      {showingTasks && (
        <>
          <FAB onPress={() => setSheet(true)} />
          <AddTaskSheet
            visible={sheet}
            onClose={() => setSheet(false)}
            onSave={(v) => addTask(v)}
          />
        </>
      )}

      <BottomBar active={tab} onChange={setTab} />

      <Toast
        visible={toastVisible}
        message="Task completed"
        actionLabel="Undo"
        onAction={handleUndo}
        onHide={handleTimeout}
        duration={3500}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  list: { padding: 16, paddingBottom: 210, gap: 12 },
  sep: { height: 12 },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  placeholderText: { fontSize: 18, fontWeight: '700', color: '#6B7280' },
});
