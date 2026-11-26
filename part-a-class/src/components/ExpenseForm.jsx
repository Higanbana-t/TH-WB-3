import { Component } from 'react';
import { CATEGORIES, getTodayISO } from '../constants/expenses.js';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      amount: '',
      category: CATEGORIES[0],
      date: getTodayISO(),
      errors: {},
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => {
      const nextErrors = { ...prevState.errors };
      if (nextErrors[name]) {
        delete nextErrors[name];
      }
      return {
        [name]: value,
        errors: nextErrors,
      };
    });
  };

  validateForm() {
    const { title, amount, category, date } = this.state;
    const errors = {};

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      errors.title = 'Vui lòng nhập nội dung khoản chi.';
    } else if (trimmedTitle.length < 2) {
      errors.title = 'Nội dung cần ít nhất 2 ký tự.';
    }

    const numericAmount = Number(amount);
    if (amount === '' || amount === null) {
      errors.amount = 'Vui lòng nhập số tiền.';
    } else if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      errors.amount = 'Số tiền phải là số lớn hơn 0.';
    }

    if (!CATEGORIES.includes(category)) {
      errors.category = 'Vui lòng chọn loại chi tiêu hợp lệ.';
    }

    if (!date) {
      errors.date = 'Vui lòng chọn ngày chi.';
    }

    return errors;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const errors = this.validateForm();

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    const newExpense = {
      id: `exp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: this.state.title.trim(),
      amount: Math.round(Number(this.state.amount)),
      category: this.state.category,
      date: this.state.date,
    };

    this.props.onAddExpense(newExpense);

    this.setState({
      title: '',
      amount: '',
      category: CATEGORIES[0],
      date: getTodayISO(),
      errors: {},
    });
  };

  render() {
    const { title, amount, category, date, errors } = this.state;

    return (
      <section className="card form-card" aria-labelledby="form-heading">
        <h2 id="form-heading" className="section-title">
          Thêm khoản chi mới
        </h2>

        <form onSubmit={this.handleSubmit} noValidate className="expense-form">
          <div className="form-grid">
            <div className="form-group form-group-wide">
              <label htmlFor="expense-title">Nội dung</label>
              <input
                id="expense-title"
                name="title"
                type="text"
                value={title}
                onChange={this.handleChange}
                placeholder="Ví dụ: Ăn sáng bún bò, mua sách..."
                className={errors.title ? 'input-error' : ''}
                aria-invalid={Boolean(errors.title)}
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
                onChange={this.handleChange}
                placeholder="Ví dụ: 50000"
                className={errors.amount ? 'input-error' : ''}
                aria-invalid={Boolean(errors.amount)}
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
                onChange={this.handleChange}
                className={errors.category ? 'input-error' : ''}
                aria-invalid={Boolean(errors.category)}
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
                onChange={this.handleChange}
                className={errors.date ? 'input-error' : ''}
                aria-invalid={Boolean(errors.date)}
              />
              {errors.date && (
                <span className="error-text" role="alert">
                  {errors.date}
                </span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              + Thêm khoản chi
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default ExpenseForm;
