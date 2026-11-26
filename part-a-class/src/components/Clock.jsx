import { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      now: new Date(),
    };
    this.timerId = null;
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState({ now: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  render() {
    const { now } = this.state;
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
}

export default Clock;
