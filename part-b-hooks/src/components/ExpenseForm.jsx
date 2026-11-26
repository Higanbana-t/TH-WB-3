import { useEffect, useRef, useState } from 'react';
import { CATEGORIES, getTodayISO } from '../constants/expenses.js';

function ExpenseForm({ onAddExpense, submitting }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState(getTodayISO);
  const [errors, setErrors] = useState({});
  const [focusTick, setFocusTick] = useState(0);

  const titleInputRef = useRef(null);

  useEffect(() => {
    if (focusTick > 0 && !submitting) {
      titleInputRef.current?.focus();
    }
  }, [focusTick, submitting]);

  const clearFieldError = (field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = () => {
    const nextErrors = {};
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      nextErrors.title = 'Vui lòng nhập nội dung khoản chi.';
    } else if (trimmedTitle.length < 2) {
      nextErrors.title = 'Nội dung cần ít nhất 2 ký tự.';
    }

    const numericAmount = Number(amount);
    if (amount === '' || amount === null) {
      nextErrors.amount = 'Vui lòng nhập số tiền.';
    } else if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      nextErrors.amount = 'Số tiền phải là số lớn hơn 0.';
    }

    if (!CATEGORIES.includes(category)) {
      nextErrors.category = 'Vui lòng chọn loại chi tiêu hợp lệ.';
    }

    if (!date) {
      nextErrors.date = 'Vui lòng chọn ngày chi.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      title: title.trim(),
      amount: Math.round(Number(amount)),
      category,
      date,
    };

    try {
      await onAddExpense(payload);
      setTitle('');
      setAmount('');
      setCategory(CATEGORIES[0]);
      setDate(getTodayISO());
      setErrors({});
      setFocusTick((tick) => tick + 1);
    } catch {
      // Error banner is handled by useFetch in App
    }
  };

  return (
    <section className="card form-card" aria-labelledby="form-heading">
      <h2 id="form-heading" className="section-title">
        Thêm khoản chi mới
      </h2>

      <form onSubmit={handleSubmit} noValidate className="expense-form">
        <div className="form-grid">
          <div className="form-group form-group-wide">
            <label htmlFor="expense-title">Nội dung</label>
            <input
              ref={titleInputRef}
              id="expense-title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                clearFieldError('title');
              }}
              placeholder="Ví dụ: Ăn sáng bún bò, mua sách..."
              className={errors.title ? 'input-error' : ''}
              aria-invalid={Boolean(errors.title)}
              disabled={submitting}
            />
            {errors.title && (
              <span className="error-text" role="alert">
                {errors.title}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="expense-amount">Số tiền (VNĐ)</label>
            <input
              id="expense-amount"
              name="amount"
              type="number"
              min="1"
              step="1000"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                clearFieldError('amount');
              }}
              placeholder="Ví dụ: 50000"
              className={errors.amount ? 'input-error' : ''}
              aria-invalid={Boolean(errors.amount)}
              disabled={submitting}
            />
            {errors.amount && (
              <span className="error-text" role="alert">
                {errors.amount}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="expense-category">Loại chi tiêu</label>
            <select
              id="expense-category"
              name="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                clearFieldError('category');
              }}
              className={errors.category ? 'input-error' : ''}
              aria-invalid={Boolean(errors.category)}
              disabled={submitting}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="error-text" role="alert">
                {errors.category}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="expense-date">Ngày chi</label>
            <input
              id="expense-date"
              name="date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                clearFieldError('date');
              }}
              className={errors.date ? 'input-error' : ''}
              aria-invalid={Boolean(errors.date)}
              disabled={submitting}
            />
            {errors.date && (
              <span className="error-text" role="alert">
                {errors.date}
              </span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Đang lưu...' : '+ Thêm khoản chi'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ExpenseForm;
