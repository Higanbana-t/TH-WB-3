import { useClock } from '../hooks/useClock.js';

function Clock() {
  const now = useClock();

  const timeText = now.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const dateText = now.toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="clock-box" aria-live="off">
      <span className="clock-time">{timeText}</span>
      <span className="clock-date">{dateText}</span>
    </div>
  );
}

export default Clock;
