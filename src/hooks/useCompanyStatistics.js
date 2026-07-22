// src/hooks/useCompanyStatistics.js
import { useEffect, useState } from "react";
import api from "../services/api";

export function useCompanyStatistics() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        api.get("/statistics/")
            .then((res) => {
                const records = Array.isArray(res.data) ? res.data : [];
                const activeRecords = records.filter((r) => r.is_active);
                const pool = activeRecords.length > 0 ? activeRecords : records;

                // Pick whichever record was updated most recently, so stale
                // duplicate "active" rows never shadow the latest save.
                const latest = pool.reduce((newest, r) => {
                    if (!newest) return r;
                    return new Date(r.updated_at) > new Date(newest.updated_at) ? r : newest;
                }, null);

                if (mounted) setStats(latest || null);
            })
            .catch((err) => console.error("Failed to load statistics:", err))
            .finally(() => mounted && setLoading(false));

        return () => {
            mounted = false;
        };
    }, []);

    return { stats, loading };
}