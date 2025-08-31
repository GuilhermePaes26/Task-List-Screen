import { format, isToday, isYesterday, isTomorrow } from 'date-fns';

export const parseLocal = (iso?: string) => {
  if (!iso) return undefined;
  const [d, t] = iso.split('T');
  if (!d || !t) return new Date(iso);
  const [y, m, da] = d.split('-').map(Number);
  const [h, mi] = t.split(':').map(Number);
  return new Date(y, (m || 1) - 1, da || 1, h || 0, mi || 0, 0, 0);
};

export const isOverdue = (iso?: string) => {
  const d = parseLocal(iso);
  return d ? d.getTime() < Date.now() : false;
};

export const whenParts = (iso?: string) => {
  const d = parseLocal(iso);
  if (!d) return { day: '', time: '' };
  const day = isToday(d)
    ? 'Today'
    : isYesterday(d)
    ? 'Yesterday'
    : isTomorrow(d)
    ? 'Tomorrow'
    : format(d, 'MMM dd,yyyy');
  const time = format(d, 'p');
  return { day, time };
};
