import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import HomeIcon from '../../assets/home.svg';
import WorkIcon from '../../assets/work.svg';
import InsightsIcon from '../../assets/insights.svg';
import ProfileIcon from '../../assets/profile.svg';

type Tab = 'home' | 'work' | 'insights' | 'profile';
type Props = { active: Tab; onChange: (t: Tab) => void };

function Item({
  label,
  active,
  onPress,
  Icon,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  Icon: any;
}) {
  return (
    <Pressable style={s.item} onPress={onPress} hitSlop={8}>
      <Icon width={30} height={50} preserveAspectRatio="xMidYMid meet" />
      <Text style={[s.label, active && s.labelActive]}>{label}</Text>
    </Pressable>
  );
}

export default function BottomBar({ active, onChange }: Props) {
  return (
    <View pointerEvents="box-none" style={s.wrap}>
      <View style={s.container}>
        <Item
          label="Home"
          active={active === 'home'}
          onPress={() => onChange('home')}
          Icon={HomeIcon}
        />
        <Item
          label="My Work"
          active={active === 'work'}
          onPress={() => onChange('work')}
          Icon={WorkIcon}
        />
        <View style={s.spacer} />
        <Item
          label="Insights"
          active={active === 'insights'}
          onPress={() => onChange('insights')}
          Icon={InsightsIcon}
        />
        <Item
          label="Profile"
          active={active === 'profile'}
          onPress={() => onChange('profile')}
          Icon={ProfileIcon}
        />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 1 },
  container: {
    height: 78,
    backgroundColor: colors.navBg,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingBottom: 10,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    flexBasis: 72,
  },
  spacer: { width: 72 },
  label: { fontSize: 12, color: '#064148' },
  labelActive: { color: colors.primary, fontWeight: '700' },
});
