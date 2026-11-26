import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import ApiConfigBar from './components/ApiConfigBar.jsx';
import ExpenseForm from './components/ExpenseForm.jsx';
import CategoryStats from './components/CategoryStats.jsx';
import FilterBar from './components/FilterBar.jsx';
import ExpenseList from './components/ExpenseList.jsx';
import ConfirmModal from './components/ConfirmModal.jsx';
import {
  CATEGORIES,
  DEFAULT_MOCKAPI_URL,
  formatCurrency,
} from './constants/expenses.js';
import { useFetch } from './hooks/useFetch.js';
import { useDebounce } from './hooks/useDebounce.js';
import './App.css';

const API_URL_STORAGE_KEY = 'expense-tracker-mockapi-url';

function App() {
  const [apiUrl, setApiUrl] = useState(() => {
    try {
      const saved = localStorage.getItem(API_URL_STORAGE_KEY);
      if (saved && saved.trim()) return saved.trim();
    } catch {
      // Ignore storage access failures
    }
    return DEFAULT_MOCKAPI_URL;
  });

  const {
    data: expenses,
    loading,
    mutating,
    error,
    refetch,
    createItem,
    deleteItem,
    clearError,
  } = useFetch(apiUrl);

  const [filterCategory, setFilterCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [showClock, setShowClock] = useState(true);
  const [pendingDelete, setPendingDelete] = useState(null);

  const debouncedSearch = useDebounce(searchQuery, 350);
  const isDebouncing = searchQuery !== debouncedSearch;

  const overallTotal = expenses.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  useEffect(() => {
    document.title = `Tổng chi: ${formatCurrency(overallTotal)} | Sổ chi tiêu (Hooks)`;
  }, [overallTotal]);

  const handleApplyUrl = (nextUrl) => {
    setApiUrl(nextUrl);
    try {
      localStorage.setItem(API_URL_STORAGE_KEY, nextUrl);
    } catch {
      // Ignore storage access failures
    }
  };

  const handleAddExpense = async (payload) => {
    await createItem(payload);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteItem(pendingDelete.id);
      setPendingDelete(null);
    } catch {
      // Error state is managed by useFetch
    }
  };

  const counts = { 'Tất cả': expenses.length };
  for (const category of CATEGORIES) {
    counts[category] = expenses.filter(
      (item) => item.category === category,
    ).length;
  }

  const normalizedQuery = debouncedSearch.trim().toLowerCase();
  const filteredExpenses = expenses.filter((item) => {
    const matchesCategory =
      filterCategory === 'Tất cả' || item.category === filterCategory;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      String(item.title || '')
        .toLowerCase()
        .includes(normalizedQuery) ||
      String(item.category || '')
        .toLowerCase()
        .includes(normalizedQuery)
    );
  });

  return (
    <div className="app-shell">
      <div className="app-container">
        <Header
          showClock={showClock}
          onToggleClock={() => setShowClock((prev) => !prev)}
        />

        <ApiConfigBar
          apiUrl={apiUrl}
          onApplyUrl={handleApplyUrl}
          onRefetch={refetch}
          loading={loading}
        />

        {error && (
          <div className="error-banner" role="alert">
            <div className="error-banner-content">
              <strong>Lỗi kết nối dữ liệu:</strong> {error}
            </div>
            <div className="error-banner-actions">
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={refetch}
              >
                Thử lại
              </button>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={clearError}
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        <main className="main-content">
          <ExpenseForm
            onAddExpense={handleAddExpense}
            submitting={mutating}
          />

          <CategoryStats expenses={expenses} />

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
              onSelectCategory={setFilterCategory}
              counts={counts}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              isDebouncing={isDebouncing}
            />

            <ExpenseList
              expenses={filteredExpenses}
              activeCategory={filterCategory}
              searchQuery={debouncedSearch}
              overallTotal={overallTotal}
              loading={loading}
              mutating={mutating}
              onRequestDelete={setPendingDelete}
            />
          </section>
        </main>

        <ConfirmModal
          expense={pendingDelete}
          onConfirm={handleConfirmDelete}
          onCancel={() => setPendingDelete(null)}
          busy={mutating}
        />
      </div>
    </div>
  );
}

export default App;
