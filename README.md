# LTW - Bài thực hành 03 (N2): Sổ chi tiêu cá nhân

- **Họ và tên:** `Trần Trọng Trường`
- **Mã sinh viên:** `B23DCCC167`
- **Lớp / Nhóm:** N2

## Cấu trúc thư mục

```text
.
├── part-a-class/    # Phần A: Xây dựng bằng React Class Component
├── part-b-hooks/    # Phần B: Xây dựng lại bằng Function Component + Hooks + MockAPI
└── README.md


---

## Cách chạy dự án

Yêu cầu máy đã cài **Node.js** (khuyến nghị `>= 18`).

### 1. Chạy Phần A (Class Component)
```bash
cd part-a-class
npm install
npm run dev
```

### 2. Chạy Phần B (Function Component + Hooks)
1. Tạo một project trên [MockAPI.io](https://mockapi.io/) và tạo resource tên **`expenses`** với các trường:
   - `title` (String)
   - `amount` (Number)
   - `category` (String)
   - `date` (String)
2. Cấu hình endpoint vào file `.env` trong `part-b-hooks` (tham khảo `.env.example`):
   ```env
   VITE_MOCKAPI_URL=https://<your-project-id>.mockapi.io/api/v1/expenses
   ```
   *(Ngoài ra, bạn cũng có thể dán trực tiếp URL MockAPI vào ô **Endpoint MockAPI** trên giao diện ứng dụng rồi bấm **Kết nối**).*
3. Cài đặt và khởi chạy:
   ```bash
   cd part-b-hooks
   npm install
   npm run dev
   ```


