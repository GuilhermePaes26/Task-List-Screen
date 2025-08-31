import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  visible: boolean;
  message: string;
  onHide: () => void;
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
};

export default function Toast({
  visible,
  message,
  onHide,
  duration = 3000,
  actionLabel,
  onAction,
}: Props) {
  const y = useRef(new Animated.Value(80)).current;
  const op = useRef(new Animated.Value(0)).current;
  const p = useRef(new Animated.Value(0)).current;
  const timer = useRef<NodeJS.Timeout | null>(null);

  function clear() {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }

  useEffect(() => {
    if (visible) {
      clear();
      p.setValue(0);
      Animated.parallel([
        Animated.timing(y, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(op, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(p, { toValue: 1, duration, useNativeDriver: false }),
      ]).start(() => {
        Animated.parallel([
          Animated.timing(y, {
            toValue: 80,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(op, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(onHide);
      });
    } else {
      clear();
      Animated.parallel([
        Animated.timing(y, {
          toValue: 80,
          duration: 160,
          useNativeDriver: true,
        }),
        Animated.timing(op, {
          toValue: 0,
          duration: 160,
          useNativeDriver: true,
        }),
      ]).start();
    }
    return clear;
  }, [visible, duration]);

  function handleAction() {
    clear();
    onAction && onAction();
    Animated.parallel([
      Animated.timing(y, { toValue: 80, duration: 160, useNativeDriver: true }),
      Animated.timing(op, { toValue: 0, duration: 160, useNativeDriver: true }),
    ]).start(onHide);
  }

  const barWidth = p.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View pointerEvents="box-none" style={s.wrap}>
      <Animated.View
        style={[s.toast, { opacity: op, transform: [{ translateY: y }] }]}
      >
        <Text style={s.text}>{message}</Text>
        {!!actionLabel && (
          <Pressable onPress={handleAction} style={s.btn}>
            <Text style={s.btnText}>{actionLabel}</Text>
          </Pressable>
        )}
        <View style={s.barTrack}>
          <Animated.View style={[s.barFill, { width: barWidth }]} />
        </View>
      </Animated.View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 140,
    alignItems: 'center',
  },
  toast: {
    backgroundColor: '#FFF6DC',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    maxWidth: '90%',
  },
  text: { color: '#374151', fontSize: 16, fontWeight: '700', flexShrink: 1 },
  btn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#064148',
  },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  barTrack: {
    position: 'absolute',
    left: 8,
    right: 8,
    bottom: 6,
    height: 4,
    overflow: 'hidden',
    borderRadius: 2,
  },
  barFill: { height: 4, backgroundColor: '#1E3A5F', borderRadius: 2 },
});
