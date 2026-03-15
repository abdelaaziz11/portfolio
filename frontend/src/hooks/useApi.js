import { useState, useEffect, useCallback } from 'react';

/**
 * A generic data-fetching hook that wraps api.js methods.
 *
 * @param {Function} apiFn  - An async function that returns { data: ... }
 * @param {Array}    deps   - Optional dependency array to re-fetch
 * @returns {{ data, loading, error, refetch }}
 */
export function useApi(apiFn, deps = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await apiFn();
            setData(res.data);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return { data, loading, error, refetch: fetch };
}
