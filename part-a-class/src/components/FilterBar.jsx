import { Component } from 'react';
import { FILTER_OPTIONS } from '../constants/expenses.js';

class FilterBar extends Component {
  render() {
    const { activeCategory, onSelectCategory, counts } = this.props;

    return (
      <div className="filter-bar" role="group" aria-label="Lọc theo loại chi tiêu">
        {FILTER_OPTIONS.map((category) => {
          const isActive = activeCategory === category;
          const count = counts[category] ?? 0;

          return (
            <button
              key={category}
              type="button"
              className={`filter-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(category)}
              aria-pressed={isActive}
            >
              <span>{category}</span>
              <span className="filter-count">{count}</span>
            </button>
          );
        })}
      </div>
    );
  }
}

export default FilterBar;
