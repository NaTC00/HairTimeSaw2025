
function toTime(minutes) {
  const h = String(Math.floor(minutes / 60)).padStart(2, '0')
  const m = String(minutes % 60).padStart(2, '0')
  return `${h}:${m}`;
}

function parseTimeSlot(time_slot) {
  const [fromStr, toStr] = time_slot.split('-').map(s => s.trim());
  const [fromH, fromM] = fromStr.split(':').map(Number);
  const [toH, toM] = toStr.split(':').map(Number);

  return {
    from: fromH * 60 + fromM,
    to: toH * 60 + toM
  };
}

module.exports = {
  toTime,
  parseTimeSlot
};