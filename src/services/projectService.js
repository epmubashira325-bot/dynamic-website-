// src/services/projectService.js
import api from "./api";

// Get all projects with pagination and search
export const getProjects = async (page = 1, search = "", perPage = 10) => {
    try {
        let url = '/project/';
        const params = new URLSearchParams();

        if (page) params.append('page', page);
        if (search) params.append('search', search);
        if (perPage) params.append('page_size', perPage);

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        console.log(`✅ Fetching projects with URL: ${url}`);
        const response = await api.get(url);
        return response;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

// Get a single project by ID
export const getProject = async (id) => {
    try {
        const response = await api.get(`/project/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching project:', error);
        throw error;
    }
};

// Create a new project
export const addProject = async (data) => {
    try {
        const response = await api.post("/project/", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

// Update a project
export const updateProject = async (id, data) => {
    try {
        const response = await api.patch(`/project/${id}/`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
};

// Delete a project
export const deleteProject = async (id) => {
    try {
        const response = await api.delete(`/project/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
};

// Toggle project status (active/inactive)
export const toggleProjectStatus = async (id) => {
    try {
        const response = await api.patch(`/project/${id}/toggle-status/`);
        return response.data;
    } catch (error) {
        console.error('Error toggling project status:', error);
        throw error;
    }
};

// NEW: Fetch ALL projects by auto-paginating through the backend.
// Used by ProjectList.jsx so that the UI's "Show X entries" selector
// and Next/Previous pagination work against the full dataset instead
// of a single backend page at a time.
export const getAllProjects = async (search = "") => {
    console.log("📦 Fetching all projects (auto-pagination)...");
    let allProjects = [];
    let page = 1;
    const pageSize = 100;
    let hasNext = true;

    try {
        while (hasNext) {
            const response = await getProjects(page, search, pageSize);
            const data = response?.data;

            let pageItems = [];
            let nextUrl = null;

            if (data) {
                if (Array.isArray(data.results)) {
                    pageItems = data.results;
                    nextUrl = data.next || null;
                } else if (Array.isArray(data)) {
                    pageItems = data;
                    nextUrl = null;
                } else {
                    pageItems = [data];
                    nextUrl = null;
                }
            }

            allProjects = [...allProjects, ...pageItems];
            hasNext = !!nextUrl;
            page++;
        }

        console.log(`✅ All projects fetched: ${allProjects.length} projects`);
        return {
            data: allProjects,
            total: allProjects.length
        };
    } catch (error) {
        console.error("❌ Error fetching all projects:", error);
        throw error;
    }
};

// Export all functions as default object
export default {
    getProjects,
    getProject,
    addProject,
    updateProject,
    deleteProject,
    toggleProjectStatus,
    getAllProjects,
};