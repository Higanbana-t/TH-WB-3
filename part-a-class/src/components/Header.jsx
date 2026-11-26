import { Component } from 'react';
import Clock from './Clock.jsx';

class Header extends Component {
  render() {
    const { showClock, onToggleClock } = this.props;

    return (
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-badge">Phần A · Class Component</div>
          <h1>Sổ chi tiêu cá nhân</h1>
          <p className="header-subtitle">
            Ghi chép, phân loại và theo dõi chi tiêu hằng ngày
          </p>
        </div>

        <div className="header-clock-area">
          {showClock ? (
            <Clock />
          ) : (
            <div className="clock-hidden-note">Đồng hồ đã tạm ẩn</div>
          )}
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onToggleClock}
          >
            {showClock ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}
          </button>
        </div>
      </header>
    );
  }
}

export default Header;
