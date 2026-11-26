import { useState } from 'react';

function ApiConfigBar({ apiUrl, onApplyUrl, onRefetch, loading }) {
  const [draftUrl, setDraftUrl] = useState(apiUrl);

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleaned = draftUrl.trim();
    if (!cleaned) return;
    if (cleaned === apiUrl) {
      onRefetch();
    } else {
      onApplyUrl(cleaned);
    }
  };

  return (
    <section className="card api-bar" aria-label="Cấu hình MockAPI">
      <form className="api-form" onSubmit={handleSubmit}>
        <label htmlFor="mockapi-url" className="api-label">
          Endpoint MockAPI
        </label>
        <input
          id="mockapi-url"
          type="url"
          value={draftUrl}
          onChange={(e) => setDraftUrl(e.target.value)}
          placeholder="https://your-project-id.mockapi.io/api/v1/expenses"
          className="api-input"
          required
        />
        <div className="api-buttons">
          <button
            type="submit"
            className="btn btn-outline btn-sm"
            disabled={loading}
          >
            Kết nối
          </button>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onRefetch}
            disabled={loading}
          >
            Tải lại
          </button>
        </div>
      </form>
    </section>
  );
}

export default ApiConfigBar;
