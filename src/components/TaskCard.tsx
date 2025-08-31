import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  LayoutChangeEvent,
} from 'react-native';
import { Task } from '../types';
import { colors } from '../theme/colors';
import { isOverdue, whenParts } from '../utils/date';
import CheckIcon from '../../assets/check.svg';
import FolderIcon from '../../assets/folder.svg';
import CalendarIcon from '../../assets/calendar.svg';

type Props = { task: Task; onToggle: () => void };

export default function TaskCard({ task, onToggle }: Props) {
  const overdue = isOverdue(task.dueAt);
  const { day, time } = whenParts(task.dueAt);

  const ringScale = useRef(new Animated.Value(0.01)).current;
  const ringOpacity = useRef(new Animated.Value(0)).current;
  const checkOpacity = useRef(
    new Animated.Value(task.completed ? 1 : 0),
  ).current;
  const checkScale = useRef(
    new Animated.Value(task.completed ? 1 : 0.6),
  ).current;
  const cardOpacity = useRef(new Animated.Value(1)).current;
  const cardScale = useRef(new Animated.Value(1)).current;
  const slideY = useRef(new Animated.Value(0)).current;
  const height = useRef(new Animated.Value(0)).current;
  const [measured, setMeasured] = useState(0);
  const running = useRef(false);

  useEffect(() => {
    if (task.completed) {
      checkOpacity.setValue(1);
      checkScale.setValue(1);
      cardOpacity.setValue(1);
      cardScale.setValue(1);
      slideY.setValue(0);
      if (measured > 0) height.setValue(measured);
    } else {
      checkOpacity.setValue(0);
      checkScale.setValue(0.6);
      cardOpacity.setValue(1);
      cardScale.setValue(1);
      slideY.setValue(0);
      if (measured > 0) height.setValue(measured);
    }
  }, [task.completed, measured]);

  function onCardLayout(e: LayoutChangeEvent) {
    const h = e.nativeEvent.layout.height;
    if (!measured && h) {
      setMeasured(h);
      height.setValue(h);
    }
  }

  function playAndComplete() {
    if (task.completed) {
      onToggle();
      return;
    }
    if (running.current || measured === 0) return;
    running.current = true;
    ringScale.setValue(1);
    ringOpacity.setValue(0.35);
    Animated.sequence([
      Animated.parallel([
        Animated.timing(checkOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(checkScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(ringScale, {
          toValue: 1.9,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(ringOpacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(350),
      Animated.parallel([
        Animated.timing(cardOpacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(cardScale, {
          toValue: 0.96,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(slideY, {
          toValue: -16,
          duration: 220,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(height, {
        toValue: 0,
        duration: 220,
        useNativeDriver: false,
      }),
    ]).start(() => {
      running.current = false;
      onToggle();
    });
  }

  const Inner = (
    <Animated.View
      onLayout={onCardLayout}
      style={{
        opacity: cardOpacity,
        transform: [{ scale: cardScale }, { translateY: slideY }],
      }}
    >
      <View style={s.card}>
        <View style={s.row}>
          <View style={s.gutter}>
            <CheckIcon width={18} height={18} fill="#7C3AED" stroke="#7C3AED" />
          </View>
          <View style={s.body}>
            <Text style={s.title}>{task.title}</Text>
            <View style={s.metaRow}>
              {!!task.context && (
                <View style={s.metaItem}>
                  <FolderIcon width={14} height={14} />
                  <Text style={s.metaText}>{task.context}</Text>
                </View>
              )}
              {!!task.dueAt && (
                <View style={s.metaItem}>
                  <CalendarIcon width={14} height={14} />
                  <Text style={s.metaText}>{day}</Text>
                  <Text style={s.dot}>•</Text>
                  <Text style={s.metaText}>{time}</Text>
                  {overdue && (
                    <View style={s.overdueWrap}>
                      <View style={s.redDot} />
                      <Text style={s.overdue}>Overdue</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
          <Pressable
            onPress={playAndComplete}
            style={[s.doneBox, task.completed && s.doneBoxOn]}
          >
            <Animated.View
              style={[
                s.ring,
                { opacity: ringOpacity, transform: [{ scale: ringScale }] },
              ]}
            />
            <Animated.View
              style={{
                opacity: checkOpacity,
                transform: [{ scale: checkScale }],
              }}
            >
              <CheckIcon
                width={24}
                height={24}
                fill={colors.primary}
                stroke={colors.primary}
              />
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );

  if (measured === 0) return Inner;
  return (
    <Animated.View style={{ height, overflow: 'hidden' }}>
      {Inner}
    </Animated.View>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: { flexDirection: 'row', alignItems: 'stretch' },
  gutter: {
    width: 26,
    marginRight: 10,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: 2,
  },
  body: { flex: 1 },
  title: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '700',
    marginBottom: 6,
  },
  metaRow: { gap: 6 },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  metaText: { fontSize: 12, color: '#6B7280' },
  dot: { fontSize: 12, color: '#6B7280', marginHorizontal: -2 },
  overdueWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginLeft: 6,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger,
  },
  overdue: { fontSize: 12, color: colors.danger, fontWeight: '600' },
  doneBox: {
    width: 54,
    height: 54,
    borderRadius: 8,
    backgroundColor: '#EAF7F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CFEFE2',
    marginLeft: 12,
    alignSelf: 'flex-start',
    marginTop: 5,
    overflow: 'hidden',
  },
  doneBoxOn: { backgroundColor: '#DDF4EA', borderColor: colors.primary },
  ring: {
    position: 'absolute',
    width: 54,
    height: 54,
    borderRadius: 8,
    backgroundColor: '#CFEFE2',
  },
});
