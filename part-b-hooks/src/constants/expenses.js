export const CATEGORIES = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

export const FILTER_OPTIONS = ['Tất cả', ...CATEGORIES];

export const CATEGORY_STYLES = {
  'Ăn uống': 'cat-food',
  'Đi lại': 'cat-transport',
  'Học tập': 'cat-study',
  'Giải trí': 'cat-entertainment',
};

export const CATEGORY_BAR_COLORS = {
  'Ăn uống': '#f59e0b',
  'Đi lại': '#3b82f6',
  'Học tập': '#10b981',
  'Giải trí': '#a855f7',
};

export const DEFAULT_MOCKAPI_URL =
  import.meta.env.VITE_MOCKAPI_URL ||
  'https://670000000000000000000000.mockapi.io/api/v1/expenses';

export function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
}

export function formatDate(dateString) {
  if (!dateString) return '';
  const parts = dateString.split('-');
  if (parts.length !== 3) return dateString;
  const [year, month, day] = parts;
  return `${day}/${month}/${year}`;
}

export function getTodayISO() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
