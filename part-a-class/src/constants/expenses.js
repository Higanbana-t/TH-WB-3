export const CATEGORIES = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];

export const FILTER_OPTIONS = ['Tất cả', ...CATEGORIES];

export const CATEGORY_STYLES = {
  'Ăn uống': 'cat-food',
  'Đi lại': 'cat-transport',
  'Học tập': 'cat-study',
  'Giải trí': 'cat-entertainment',
};

export const INITIAL_EXPENSES = [
  {
    id: 'exp-1',
    title: 'Cơm trưa văn phòng & trà đá',
    amount: 45000,
    category: 'Ăn uống',
    date: '2026-11-26',
  },
  {
    id: 'exp-2',
    title: 'Đổ xăng xe máy',
    amount: 70000,
    category: 'Đi lại',
    date: '2026-11-25',
  },
  {
    id: 'exp-3',
    title: 'Mua giáo trình Lập trình Web nâng cao',
    amount: 165000,
    category: 'Học tập',
    date: '2026-11-24',
  },
  {
    id: 'exp-4',
    title: 'Vé xem phim cuối tuần',
    amount: 110000,
    category: 'Giải trí',
    date: '2026-11-23',
  },
  {
    id: 'exp-5',
    title: 'Cà phê học nhóm',
    amount: 55000,
    category: 'Ăn uống',
    date: '2026-11-22',
  },
  {
    id: 'exp-6',
    title: 'Vé tháng xe buýt sinh viên',
    amount: 140000,
    category: 'Đi lại',
    date: '2026-11-20',
  },
];

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
