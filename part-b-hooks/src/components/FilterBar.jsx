import { FILTER_OPTIONS } from '../constants/expenses.js';

function FilterBar({
  activeCategory,
  onSelectCategory,
  counts,
  searchQuery,
  onSearchChange,
  isDebouncing,
}) {
  return (
    <div className="toolbar">
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

      <div className="search-box">
        <label htmlFor="expense-search" className="sr-only">
          Tìm kiếm khoản chi
        </label>
        <input
          id="expense-search"
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm theo nội dung chi..."
          className="search-input"
        />
        {isDebouncing && (
          <span className="debounce-indicator">Đang tìm...</span>
        )}
      </div>
    </div>
  );
}

export default FilterBar;
