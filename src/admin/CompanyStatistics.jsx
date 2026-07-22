// src/admin/CompanyStatistics.jsx
import { useEffect, useState } from "react";
import api from "../services/api";
import "./CompanyStatistics.css";

function CompanyStatistics() {
    const [stats, setStats] = useState({
        years_experience: "",
        completed_projects: "",
        happy_clients: "",
        is_active: true,
    });
    // Track the id of the record we're editing (null = no record exists yet, so we POST)
    const [statsId, setStatsId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchStatistics();
    }, []);

    const fetchStatistics = async () => {
        try {
            setLoading(true);
            const response = await api.get("/statistics/");
            const records = Array.isArray(response.data) ? response.data : [];

            if (records.length > 0) {
                // Prefer the active record; otherwise fall back to the most recent one
                const record =
                    records.find((r) => r.is_active) ||
                    records[records.length - 1];

                setStatsId(record.id);
                setStats({
                    years_experience: record.years_experience ?? "",
                    completed_projects: record.completed_projects ?? "",
                    happy_clients: record.happy_clients ?? "",
                    is_active: record.is_active ?? true,
                });
            } else {
                setStatsId(null);
            }
        } catch (err) {
            console.error("Error fetching statistics:", err);
            setError("Failed to load statistics");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStats((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSuccess(false);
        setError("");

        const payload = {
            years_experience: Number(stats.years_experience),
            completed_projects: Number(stats.completed_projects),
            happy_clients: Number(stats.happy_clients),
            is_active: stats.is_active,
        };

        try {
            if (statsId) {
                // Update existing record
                const response = await api.patch(`/statistics/${statsId}/`, payload);
                const updated = response.data?.data || response.data;
                if (updated?.id) setStatsId(updated.id);
            } else {
                // Create new record
                const response = await api.post("/statistics/", payload);
                const created = response.data?.data || response.data;
                if (created?.id) setStatsId(created.id);
            }

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error("Error saving statistics:", err);
            setError("Failed to save statistics. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!statsId) return;
        if (!window.confirm("Delete these statistics?")) return;

        setSaving(true);
        setError("");
        try {
            await api.delete(`/statistics/${statsId}/`);
            setStatsId(null);
            setStats({
                years_experience: "",
                completed_projects: "",
                happy_clients: "",
                is_active: true,
            });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error("Error deleting statistics:", err);
            setError("Failed to delete statistics. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="stats-loading">
                <div className="spinner"></div>
                <p>Loading statistics...</p>
            </div>
        );
    }

    return (
        <div className="stats-container">
            <header className="stats-header">
                <div>
                    <h1>Company Statistics</h1>
                    <p>Manage your company's key metrics displayed on the website</p>
                </div>
            </header>

            {error && <div className="stats-error">{error}</div>}
            {success && <div className="stats-success">Statistics saved successfully!</div>}

            <form onSubmit={handleSubmit} className="stats-form">
                <div className="stats-form-grid">
                    <div className="stats-form-group">
                        <label htmlFor="years_experience">
                            Years Experience
                            <span className="stats-field-hint">Number of years in business</span>
                        </label>
                        <input
                            type="number"
                            id="years_experience"
                            name="years_experience"
                            value={stats.years_experience}
                            onChange={handleChange}
                            placeholder="e.g., 25"
                            min="0"
                            required
                        />
                    </div>

                    <div className="stats-form-group">
                        <label htmlFor="completed_projects">
                            Completed Projects
                            <span className="stats-field-hint">Total number of projects completed</span>
                        </label>
                        <input
                            type="number"
                            id="completed_projects"
                            name="completed_projects"
                            value={stats.completed_projects}
                            onChange={handleChange}
                            placeholder="e.g., 500"
                            min="0"
                            required
                        />
                    </div>

                    <div className="stats-form-group">
                        <label htmlFor="happy_clients">
                            Happy Clients
                            <span className="stats-field-hint">Number of satisfied clients</span>
                        </label>
                        <input
                            type="number"
                            id="happy_clients"
                            name="happy_clients"
                            value={stats.happy_clients}
                            onChange={handleChange}
                            placeholder="e.g., 1000"
                            min="0"
                            required
                        />
                    </div>
                </div>

                <div className="stats-form-group stats-active-toggle">
                    <label htmlFor="is_active">
                        <input
                            type="checkbox"
                            id="is_active"
                            name="is_active"
                            checked={stats.is_active}
                            onChange={(e) =>
                                setStats((prev) => ({ ...prev, is_active: e.target.checked }))
                            }
                        />
                        {" "}Active (shown on website)
                    </label>
                </div>

                <div className="stats-preview">
                    <h3>Preview</h3>
                    <div className="stats-preview-cards">
                        <div className="stats-preview-card">
                            <span className="stats-preview-number">{stats.years_experience || "—"}</span>
                            <span className="stats-preview-label">Years Experience</span>
                        </div>
                        <div className="stats-preview-card">
                            <span className="stats-preview-number">{stats.completed_projects || "—"}</span>
                            <span className="stats-preview-label">Completed Projects</span>
                        </div>
                        <div className="stats-preview-card">
                            <span className="stats-preview-number">{stats.happy_clients || "—"}</span>
                            <span className="stats-preview-label">Happy Clients</span>
                        </div>
                    </div>
                </div>

                <div className="stats-actions">
                    <button type="submit" className="stats-save-btn" disabled={saving}>
                        {saving ? "Saving..." : statsId ? "Update Statistics" : "Save Statistics"}
                    </button>
                    {statsId && (
                        <button
                            type="button"
                            className="stats-delete-btn"
                            onClick={handleDelete}
                            disabled={saving}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default CompanyStatistics;