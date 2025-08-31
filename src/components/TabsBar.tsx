import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../theme/colors';

type Props = { tabs: string[]; active: number; onChange: (i: number) => void };
type PressableLayout = { x: number; width: number };
type TextLayout = { width: number };

export default function TabsBar({ tabs, active, onChange }: Props) {
  const [pressLayouts, setPressLayouts] = useState<PressableLayout[]>([]);
  const [textLayouts, setTextLayouts] = useState<TextLayout[]>([]);
  const [ready, setReady] = useState(false);
  const ix = useRef(new Animated.Value(0)).current;
  const iw = useRef(new Animated.Value(0)).current;

  function onItemLayout(i: number, e: LayoutChangeEvent) {
    const { x, width } = e.nativeEvent.layout;
    setPressLayouts((p) => {
      const n = [...p];
      n[i] = { x, width };
      return n;
    });
  }
  function onTextLayout(i: number, e: LayoutChangeEvent) {
    const { width } = e.nativeEvent.layout;
    setTextLayouts((p) => {
      const n = [...p];
      n[i] = { width };
      return n;
    });
  }

  useEffect(() => {
    const ok =
      pressLayouts.filter(Boolean).length === tabs.length &&
      textLayouts.filter(Boolean).length === tabs.length;
    if (ok && !ready) {
      setReady(true);
      const p = pressLayouts[active];
      const t = textLayouts[active];
      if (p && t) {
        ix.setValue(p.x + (p.width - t.width) / 2);
        iw.setValue(t.width);
      }
    }
  }, [pressLayouts, textLayouts, tabs.length, active, ready]);

  useEffect(() => {
    if (!ready) return;
    const p = pressLayouts[active];
    const t = textLayouts[active];
    if (!p || !t) return;
    Animated.parallel([
      Animated.timing(ix, {
        toValue: p.x + (p.width - t.width) / 2,
        duration: 220,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
      Animated.timing(iw, {
        toValue: t.width,
        duration: 220,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
    ]).start();
  }, [active, ready, pressLayouts, textLayouts]);

  return (
    <View style={s.wrap}>
      <View style={s.row}>
        {tabs.map((t, i) => (
          <Pressable
            key={t}
            onLayout={(e) => onItemLayout(i, e)}
            onPress={() => onChange(i)}
            style={s.item}
            hitSlop={8}
          >
            <Text
              onLayout={(e) => onTextLayout(i, e)}
              style={[s.label, i === active && s.labelActive]}
            >
              {t}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={s.track}>
        {ready && (
          <Animated.View
            style={[
              s.indicator,
              { width: iw, transform: [{ translateX: ix }] },
            ]}
          />
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { paddingTop: 6 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  item: { paddingVertical: 8, paddingHorizontal: 6, alignItems: 'center' },
  label: { fontSize: 16, color: '#6B7280' },
  labelActive: { color: colors.text, fontWeight: '700' },
  track: { height: 14, justifyContent: 'flex-end', paddingHorizontal: 8 },
  indicator: { height: 3, backgroundColor: colors.primary, borderRadius: 3 },
});
