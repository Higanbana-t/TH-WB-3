import Clock from './Clock.jsx';
import { useTheme } from '../hooks/useTheme.js';

function Header({ showClock, onToggleClock }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-badge">Phần B · Function Component & Hooks</div>
        <h1>Sổ chi tiêu cá nhân</h1>
        <p className="header-subtitle">
          Đồng bộ MockAPI · Thống kê theo loại · Tìm kiếm debounce · Dark mode
        </p>
      </div>

      <div className="header-right">
        <div className="header-clock-area">
          {showClock ? (
            <Clock />
          ) : (
            <div className="clock-hidden-note">Đồng hồ đã tạm ẩn</div>
          )}
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onToggleClock}
          >
            {showClock ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}
          </button>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={toggleTheme}
            aria-label="Chuyển đổi giao diện sáng tối"
          >
            {isDark ? 'Chế độ Sáng' : 'Chế độ Tối'}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
