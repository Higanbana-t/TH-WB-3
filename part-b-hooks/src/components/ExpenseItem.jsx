import {
  CATEGORY_STYLES,
  formatCurrency,
  formatDate,
} from '../constants/expenses.js';

function ExpenseItem({ expense, onRequestDelete, disabled }) {
  const categoryClass = CATEGORY_STYLES[expense.category] || 'cat-default';

  return (
    <tr className="expense-row">
      <td className="col-title">
        <div className="expense-title">{expense.title}</div>
      </td>
      <td className="col-category">
        <span className={`category-badge ${categoryClass}`}>
          {expense.category}
        </span>
      </td>
      <td className="col-date">{formatDate(expense.date)}</td>
      <td className="col-amount">{formatCurrency(expense.amount)}</td>
      <td className="col-action">
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => onRequestDelete(expense)}
          disabled={disabled}
          aria-label={`Xóa khoản chi ${expense.title}`}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
}

export default ExpenseItem;
