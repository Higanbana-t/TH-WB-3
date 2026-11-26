import ExpenseItem from './ExpenseItem.jsx';
import { formatCurrency } from '../constants/expenses.js';

function ExpenseList({
  expenses,
  activeCategory,
  searchQuery,
  overallTotal,
  loading,
  mutating,
  onRequestDelete,
}) {
  if (loading) {
    return (
      <div className="state-box loading-box" role="status" aria-live="polite">
        <span className="spinner" aria-hidden="true" />
        <span>Đang tải danh sách khoản chi từ MockAPI...</span>
      </div>
    );
  }

  const filteredTotal = expenses.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  if (expenses.length === 0) {
    const hasSearch = searchQuery.trim().length > 0;
    return (
      <div className="empty-state">
        <p>
          {hasSearch
            ? `Không tìm thấy khoản chi nào khớp với "${searchQuery.trim()}".`
            : activeCategory === 'Tất cả'
              ? 'Chưa có khoản chi nào được ghi lại.'
              : `Không có khoản chi nào thuộc loại "${activeCategory}".`}
        </p>
        <div className="total-summary-bar">
          <span>Tổng tiền hiển thị:</span>
          <strong>{formatCurrency(0)}</strong>
        </div>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Nội dung</th>
            <th>Loại</th>
            <th>Ngày chi</th>
            <th className="th-amount">Số tiền</th>
            <th className="th-action">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onRequestDelete={onRequestDelete}
              disabled={mutating}
            />
          ))}
        </tbody>
        <tfoot>
          <tr className="total-row">
            <td colSpan={3}>
              <span className="total-label">
                Tổng tiền
                {activeCategory !== 'Tất cả' ? ` (${activeCategory})` : ''}:
              </span>
              {(activeCategory !== 'Tất cả' || searchQuery.trim()) && (
                <span className="total-subnote">
                  Tổng toàn bộ: {formatCurrency(overallTotal)}
                </span>
              )}
            </td>
            <td className="total-amount">{formatCurrency(filteredTotal)}</td>
            <td className="total-count">{expenses.length} khoản</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ExpenseList;
