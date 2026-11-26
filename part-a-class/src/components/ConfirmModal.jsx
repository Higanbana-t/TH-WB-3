import { Component } from 'react';
import { formatCurrency } from '../constants/expenses.js';

class ConfirmModal extends Component {
  render() {
    const { expense, onConfirm, onCancel } = this.props;
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
            {formatCurrency(expense.amount)}) không?
          </p>
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onCancel}
            >
              Hủy
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
            >
              Xác nhận xóa
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmModal;
