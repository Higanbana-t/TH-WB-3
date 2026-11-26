import { formatCurrency } from '../constants/expenses.js';

function ConfirmModal({ expense, onConfirm, onCancel, busy }) {
  if (!expense) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div className="modal-card">
        <h3 id="confirm-modal-title">Xác nhận xóa khoản chi</h3>
        <p className="modal-message">
          Bạn có chắc chắn muốn xóa khoản chi{' '}
          <strong>&ldquo;{expense.title}&rdquo;</strong> (
          {formatCurrency(expense.amount)}) khỏi MockAPI không?
        </p>
        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={onCancel}
            disabled={busy}
          >
            Hủy
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={busy}
          >
            {busy ? 'Đang xóa...' : 'Xác nhận xóa'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
