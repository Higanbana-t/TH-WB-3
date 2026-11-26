import {
  CATEGORIES,
  CATEGORY_BAR_COLORS,
  CATEGORY_STYLES,
  formatCurrency,
} from '../constants/expenses.js';

function CategoryStats({ expenses }) {
  const total = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  return (
    <section className="card stats-card" aria-labelledby="stats-heading">
      <div className="stats-header">
        <h2 id="stats-heading" className="section-title">
          Thống kê tổng tiền theo loại
        </h2>
        <span className="stats-total">
          Tổng chi: <strong>{formatCurrency(total)}</strong>
        </span>
      </div>

      <div className="stats-grid">
        {CATEGORIES.map((category) => {
          const items = expenses.filter((item) => item.category === category);
          const categoryTotal = items.reduce(
            (sum, item) => sum + Number(item.amount || 0),
            0,
          );
          const percent = total > 0 ? Math.round((categoryTotal / total) * 100) : 0;

          return (
            <div key={category} className="stat-item">
              <div className="stat-top">
                <span className={`category-badge ${CATEGORY_STYLES[category]}`}>
                  {category}
                </span>
                <span className="stat-percent">{percent}%</span>
              </div>
              <div className="stat-amount">{formatCurrency(categoryTotal)}</div>
              <div className="stat-meta">{items.length} khoản chi</div>
              <div className="stat-bar-track" aria-hidden="true">
                <div
                  className="stat-bar-fill"
                  style={{
                    width: `${percent}%`,
                    backgroundColor: CATEGORY_BAR_COLORS[category],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CategoryStats;
