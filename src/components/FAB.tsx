import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

type Props = { onPress: () => void };
export default function FAB({ onPress }: Props) {
  return (
    <View style={s.wrap}>
      <Pressable accessibilityRole="button" style={s.fab} onPress={onPress}>
        <Ionicons name="add" size={50} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}
const s = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 36,
    alignItems: 'center',
    zIndex: 3,
  },
  fab: {
    width: 74,
    height: 74,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
});
