import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TasksProvider } from '../context/TasksContext';
import MyWorkScreen from '../screens/MyWorkScreen';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TasksProvider>
        <MyWorkScreen />
      </TasksProvider>
    </GestureHandlerRootView>
  );
}
