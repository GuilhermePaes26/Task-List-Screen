import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (v: { title: string; context?: string; dueAt?: string }) => void;
};

export default function AddTaskSheet({ visible, onClose, onSave }: Props) {
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [dueAt, setDueAt] = useState('');
  const slide = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slide, {
      toValue: visible ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  function save() {
    onSave({ title, context: context || undefined, dueAt: dueAt || undefined });
    setTitle('');
    setContext('');
    setDueAt('');
    onClose();
  }

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={s.overlay}>
        <Pressable style={s.backdrop} onPress={onClose} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={s.kav}
        >
          <Animated.View
            style={[
              s.sheet,
              {
                transform: [
                  {
                    translateY: slide.interpolate({
                      inputRange: [0, 1],
                      outputRange: [400, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={s.title}>New Task</Text>
            <TextInput
              style={s.input}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={s.input}
              placeholder="Context"
              value={context}
              onChangeText={setContext}
            />
            <TextInput
              style={s.input}
              placeholder="YYYY-MM-DDTHH:mm"
              value={dueAt}
              onChangeText={setDueAt}
            />
            <View style={s.row}>
              <Pressable style={[s.btn, s.cancel]} onPress={onClose}>
                <Text style={s.btnCancel}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[s.btn, s.save]}
                onPress={save}
                disabled={!title}
              >
                <Text style={s.btnSave}>Save</Text>
              </Pressable>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay: { flex: 1 },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  kav: { flex: 1, justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    minHeight: 280,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 4,
  },
  btn: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancel: { backgroundColor: '#EFF1F5' },
  save: { backgroundColor: colors.primary },
  btnCancel: { color: '#374151', fontSize: 14 },
  btnSave: { color: '#fff', fontSize: 14, fontWeight: '700' },
});
