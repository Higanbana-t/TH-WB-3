import { useCallback, useEffect, useState } from 'react';

function normalizeUrl(url) {
  return url.trim().replace(/\/+$/, '');
}

async function parseErrorMessage(response) {
  try {
    const text = await response.text();
    return text || `HTTP ${response.status}`;
  } catch {
    return `HTTP ${response.status}`;
  }
}

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [error, setError] = useState(null);
  const [reloadTick, setReloadTick] = useState(0);

  const cleanUrl = normalizeUrl(url || '');

  useEffect(() => {
    const controller = new AbortController();

    async function loadExpenses() {
      await Promise.resolve();
      if (controller.signal.aborted) return;

      if (!cleanUrl) {
        setData([]);
        setLoading(false);
        setError('Chưa có đường dẫn MockAPI hợp lệ.');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(cleanUrl, { signal: controller.signal });
        if (!response.ok) {
          const detail = await parseErrorMessage(response);
          throw new Error(
            `Không thể tải dữ liệu (${response.status}): ${detail}`,
          );
        }
        const json = await response.json();
        const items = Array.isArray(json) ? json : [];
        setData(items.slice().reverse());
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Đã xảy ra lỗi khi kết nối tới MockAPI.');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadExpenses();

    return () => controller.abort();
  }, [cleanUrl, reloadTick]);

  const refetch = useCallback(() => {
    setReloadTick((tick) => tick + 1);
  }, []);

  const createItem = useCallback(
    async (payload) => {
      setMutating(true);
      setError(null);

      try {
        const response = await fetch(cleanUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const detail = await parseErrorMessage(response);
          throw new Error(
            `Không thể thêm khoản chi (${response.status}): ${detail}`,
          );
        }

        const created = await response.json();
        setData((prev) => [created, ...prev]);
        return created;
      } catch (err) {
        setError(err.message || 'Lỗi khi thêm khoản chi lên MockAPI.');
        throw err;
      } finally {
        setMutating(false);
      }
    },
    [cleanUrl],
  );

  const deleteItem = useCallback(
    async (id) => {
      setMutating(true);
      setError(null);

      try {
        const response = await fetch(`${cleanUrl}/${encodeURIComponent(id)}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const detail = await parseErrorMessage(response);
          throw new Error(
            `Không thể xóa khoản chi (${response.status}): ${detail}`,
          );
        }

        setData((prev) => prev.filter((item) => item.id !== id));
      } catch (err) {
        setError(err.message || 'Lỗi khi xóa khoản chi trên MockAPI.');
        throw err;
      } finally {
        setMutating(false);
      }
    },
    [cleanUrl],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    data,
    loading,
    mutating,
    error,
    refetch,
    createItem,
    deleteItem,
    clearError,
  };
}
