import { Component } from 'react';
import Header from './components/Header.jsx';
import ExpenseForm from './components/ExpenseForm.jsx';
import FilterBar from './components/FilterBar.jsx';
import ExpenseList from './components/ExpenseList.jsx';
import ConfirmModal from './components/ConfirmModal.jsx';
import {
  CATEGORIES,
  INITIAL_EXPENSES,
  formatCurrency,
} from './constants/expenses.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: INITIAL_EXPENSES,
      filterCategory: 'Tất cả',
      showClock: true,
      pendingDelete: null,
    };
  }

  getTotalAmount(expenses) {
    return expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  }

  updateDocumentTitle() {
    const total = this.getTotalAmount(this.state.expenses);
    document.title = `Tổng chi: ${formatCurrency(total)} | Sổ chi tiêu cá nhân`;
  }

  componentDidMount() {
    this.updateDocumentTitle();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.expenses !== this.state.expenses) {
      this.updateDocumentTitle();
    }
  }

  handleAddExpense = (newExpense) => {
    this.setState((prevState) => ({
      expenses: [newExpense, ...prevState.expenses],
    }));
  };

  handleSelectCategory = (category) => {
    this.setState({ filterCategory: category });
  };

  handleToggleClock = () => {
    this.setState((prevState) => ({ showClock: !prevState.showClock }));
  };

  handleRequestDelete = (expense) => {
    this.setState({ pendingDelete: expense });
  };

  handleCancelDelete = () => {
    this.setState({ pendingDelete: null });
  };

  handleConfirmDelete = () => {
    const { pendingDelete } = this.state;
    if (!pendingDelete) return;

    this.setState((prevState) => ({
      expenses: prevState.expenses.filter(
        (item) => item.id !== pendingDelete.id,
      ),
      pendingDelete: null,
    }));
  };

  render() {
    const { expenses, filterCategory, showClock, pendingDelete } = this.state;

    const counts = {
      'Tất cả': expenses.length,
    };
    for (const category of CATEGORIES) {
      counts[category] = expenses.filter(
        (item) => item.category === category,
      ).length;
    }

    const filteredExpenses =
      filterCategory === 'Tất cả'
        ? expenses
        : expenses.filter((item) => item.category === filterCategory);

    const overallTotal = this.getTotalAmount(expenses);

    return (
      <div className="app-shell">
        <div className="app-container">
          <Header
            showClock={showClock}
            onToggleClock={this.handleToggleClock}
          />

          <main className="main-content">
            <ExpenseForm onAddExpense={this.handleAddExpense} />

            <section className="card list-card" aria-labelledby="list-heading">
              <div className="list-header">
                <div>
                  <h2 id="list-heading" className="section-title">
                    Danh sách khoản chi
                  </h2>
                  <p className="section-subtitle">
                    Tổng chi tích lũy:{' '}
                    <strong>{formatCurrency(overallTotal)}</strong> (
                    {expenses.length} khoản)
                  </p>
                </div>
              </div>

              <FilterBar
                activeCategory={filterCategory}
                onSelectCategory={this.handleSelectCategory}
                counts={counts}
              />

              <ExpenseList
                expenses={filteredExpenses}
                activeCategory={filterCategory}
                overallTotal={overallTotal}
                onRequestDelete={this.handleRequestDelete}
              />
            </section>
          </main>

          <ConfirmModal
            expense={pendingDelete}
            onConfirm={this.handleConfirmDelete}
            onCancel={this.handleCancelDelete}
          />
        </div>
      </div>
    );
  }
}

export default App;
