(() => {
  'use strict';

  const minutes = value => {
    const [hours, mins] = value.split(':').map(Number);
    return hours * 60 + mins;
  };
  const time = value => `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`;

  function overlaps(start, end, otherStart, otherEnd) {
    return start < otherEnd && end > otherStart;
  }

  function freeSlots(windows, blocks) {
    return windows.flatMap(([windowStart, windowEnd]) => {
      let slots = [[minutes(windowStart), minutes(windowEnd)]];
      blocks
        .filter(block => block.start && block.end && block.start !== '—' && block.end !== '—')
        .map(block => [minutes(block.start), minutes(block.end)])
        .sort((a, b) => a[0] - b[0])
        .forEach(([blockStart, blockEnd]) => {
          slots = slots.flatMap(([start, end]) => {
            if (!overlaps(start, end, blockStart, blockEnd)) return [[start, end]];
            const remaining = [];
            if (blockStart > start) remaining.push([start, blockStart]);
            if (blockEnd < end) remaining.push([blockEnd, end]);
            return remaining;
          });
        });
      return slots.filter(([start, end]) => end > start).map(([start, end]) => [time(start), time(end)]);
    });
  }

  function findSlot(windows, blocks, duration) {
    const slot = freeSlots(windows, blocks).find(([start, end]) => minutes(end) - minutes(start) >= duration);
    if (!slot) return null;
    const start = minutes(slot[0]);
    return { start: time(start), end: time(start + duration) };
  }

  window.PlannerScheduling = { overlaps, freeSlots, findSlot };
})();
