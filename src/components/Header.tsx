import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import TabsBar from './TabsBar';
import BellIcon from '../../assets/bell.svg';
import ClockIcon from '../../assets/clock.svg';
import FolderIcon from '../../assets/folder.svg';
import ChevronDown from '../../assets/chevron-down.svg';

type Filter = 'All' | 'Today' | 'Overdue';

type Props = {
  tabs: string[];
  activeTab: number;
  onTabChange: (i: number) => void;
  filterValue: Filter;
  onChangeFilter: (v: Filter) => void;
};

export default function Header({
  tabs,
  activeTab,
  onTabChange,
  filterValue,
  onChangeFilter,
}: Props) {
  const [open, setOpen] = useState(false);
  const options: Filter[] = ['All', 'Today', 'Overdue'];

  return (
    <View style={s.wrap} onStartShouldSetResponder={() => true}>
      <View style={s.topRow}>
        <Text style={s.title}>My Work</Text>
        <View style={s.actions}>
          <Pressable hitSlop={6} style={s.iconBtn}>
            <BellIcon
              width={20}
              height={80}
              fill={colors.text}
              stroke={colors.text}
            />
          </Pressable>
          <Pressable hitSlop={6} style={s.iconBtn}>
            <ClockIcon
              width={20}
              height={80}
              fill={colors.text}
              stroke={colors.text}
            />
          </Pressable>
        </View>
      </View>

      <View style={s.greetRow}>
        <Text style={s.greet}>Good morning, Louis!</Text>
        <Pressable
          onPress={() => setOpen(true)}
          style={s.filterBtn}
          hitSlop={6}
        >
          <FolderIcon width={18} height={18} fill={colors.text} />
          <Text style={s.filterText}>{filterValue}</Text>
          <ChevronDown
            width={14}
            height={14}
            fill={colors.text}
            stroke={colors.text}
          />
        </Pressable>
      </View>

      <View style={s.tabsWrap}>
        <TabsBar tabs={tabs} active={activeTab} onChange={onTabChange} />
      </View>

      <View style={s.divider} />

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={s.overlay} onPress={() => setOpen(false)} />
        <View style={s.menuPos}>
          <View style={s.menuCard}>
            {options.map((o) => (
              <Pressable
                key={o}
                onPress={() => {
                  onChangeFilter(o);
                  setOpen(false);
                }}
                style={[s.menuItem, o === filterValue && s.menuItemActive]}
              >
                <Text
                  style={[s.menuText, o === filterValue && s.menuTextActive]}
                >
                  {o}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    paddingHorizontal: 16,
    paddingTop: 28,
    backgroundColor: colors.background,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  title: { fontSize: 18, color: colors.text, fontWeight: '700' },
  actions: { flexDirection: 'row', gap: 14 },
  iconBtn: { padding: 6, borderRadius: 10 },
  greetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  greet: { fontSize: 18, fontWeight: '700', color: colors.text },
  filterBtn: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  filterText: { fontSize: 14, color: colors.text, fontWeight: '700' },
  tabsWrap: { marginTop: 2, marginBottom: 8 },
  divider: { height: 1, backgroundColor: colors.border, marginTop: 6 },
  overlay: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  menuPos: { position: 'absolute', top: 110, right: 16 },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 6,
    minWidth: 160,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 8,
  },
  menuItem: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 },
  menuItemActive: { backgroundColor: '#F3F4F6' },
  menuText: { fontSize: 14, color: colors.text },
  menuTextActive: { fontWeight: '700' },
});
