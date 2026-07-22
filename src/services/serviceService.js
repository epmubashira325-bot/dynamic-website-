// src/services/serviceService.js
import api from "./api";

// Get all services with pagination
export const getServices = async (page = 1, pageSize = 10) => {
    console.log(`✅ Fetching services with URL: /service/?page=${page}&page_size=${pageSize}`);
    try {
        const response = await api.get("/service/", {
            params: {
                page: page,
                page_size: pageSize,
            },
        });
        console.log("✅ Services fetched successfully:", response.data);

        // Return the full paginated response
        return {
            data: response.data.results || [],
            count: response.data.count || 0,
            next: response.data.next || null,
            previous: response.data.previous || null,
            totalPages: Math.ceil((response.data.count || 0) / pageSize),
            currentPage: page,
            pageSize: pageSize,
            rawResponse: response.data // Keep raw response if needed
        };
    } catch (error) {
        console.error("❌ Error fetching services:", error);
        throw error;
    }
};

// Get a single service by ID
export const getServiceById = async (id) => {
    console.log(`🔍 Fetching service ${id}...`);
    try {
        const response = await api.get(`/service/${id}/`);
        console.log(`✅ Service ${id} fetched successfully:`, response.data);
        return {
            data: response.data,
            status: response.status
        };
    } catch (error) {
        console.error(`❌ Error fetching service ${id}:`, error);
        throw error;
    }
};

// Get a single service by slug (for SEO-friendly URLs)
export const getServiceBySlug = async (slug) => {
    console.log(`🔍 Fetching service with slug: ${slug}...`);
    try {
        const response = await api.get(`/service/slug/${slug}/`);
        console.log(`✅ Service with slug ${slug} fetched successfully:`, response.data);
        return {
            data: response.data,
            status: response.status
        };
    } catch (error) {
        console.error(`❌ Error fetching service with slug ${slug}:`, error);
        throw error;
    }
};

// Get a single service by section ID (for navigation)
export const getServiceBySectionId = async (sectionId) => {
    console.log(`🔍 Fetching service with section ID: ${sectionId}...`);
    try {
        // Fetch all active services
        const response = await getActiveServices();
        const services = response.data || [];

        // Find service by sectionId (case insensitive)
        const service = services.find(
            s => s.section_id?.toLowerCase() === sectionId?.toLowerCase() ||
                s.id?.toString() === sectionId?.toString() ||
                s.slug?.toLowerCase() === sectionId?.toLowerCase()
        );

        if (service) {
            console.log(`✅ Service found for section ID ${sectionId}:`, service);
            return { data: service };
        } else {
            console.warn(`⚠️ No service found for section ID: ${sectionId}`);
            return { data: null };
        }
    } catch (error) {
        console.error(`❌ Error fetching service by section ID ${sectionId}:`, error);
        throw error;
    }
};

// Create a new service (admin only)
export const addService = async (formData) => {
    console.log("➕ Creating new service...");
    try {
        const response = await api.post("/service/", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("✅ Service created successfully:", response.data);
        return {
            data: response.data,
            status: response.status
        };
    } catch (error) {
        console.error("❌ Error creating service:", error);
        throw error;
    }
};

// Update an existing service (admin only)
export const updateService = async (id, formData) => {
    console.log(`🔄 Updating service ${id}...`);
    try {
        const response = await api.patch(`/service/${id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(`✅ Service ${id} updated successfully:`, response.data);
        return {
            data: response.data,
            status: response.status
        };
    } catch (error) {
        console.error(`❌ Error updating service ${id}:`, error);
        throw error;
    }
};

// Delete a service (admin only)
export const deleteService = async (id) => {
    console.log(`🗑️ Deleting service ${id}...`);
    try {
        const response = await api.delete(`/service/${id}/`);
        console.log(`✅ Service ${id} deleted successfully`);
        return {
            data: response.data,
            status: response.status
        };
    } catch (error) {
        console.error(`❌ Error deleting service ${id}:`, error);
        throw error;
    }
};

// Toggle service active status (admin only)
export const toggleServiceStatus = async (id, isActive) => {
    console.log(`🔄 Toggling service ${id} status to: ${isActive}`);
    try {
        const response = await api.patch(`/service/${id}/`, { is_active: isActive });
        console.log(`✅ Service ${id} status toggled successfully`);
        return {
            data: response.data,
            status: response.status
        };
    } catch (error) {
        console.error(`❌ Error toggling service ${id} status:`, error);
        throw error;
    }
};

// Get all active services (public) - UPDATED to handle pagination
export const getActiveServices = async (page = 1, pageSize = 100) => {
    console.log("✅ Fetching active services...");
    try {
        const response = await api.get("/service/", {
            params: {
                is_active: true,
                page: page,
                page_size: pageSize,
            },
        });

        const services = response.data.results || [];
        console.log(`✅ Active services fetched: ${services.length} services`);

        return {
            data: services,
            count: response.data.count || 0,
            next: response.data.next || null,
            previous: response.data.previous || null,
            totalPages: Math.ceil((response.data.count || 0) / pageSize),
            currentPage: page,
            pageSize: pageSize,
            rawResponse: response.data
        };
    } catch (error) {
        console.error("❌ Error fetching active services:", error);
        throw error;
    }
};

// Get services by category
export const getServicesByCategory = async (category, page = 1, pageSize = 100) => {
    console.log(`🔍 Fetching services with category: ${category}...`);
    try {
        const response = await api.get("/service/", {
            params: {
                category: category,
                is_active: true,
                page: page,
                page_size: pageSize,
            },
        });
        console.log(`✅ Services with category ${category} fetched:`, response.data);
        return {
            data: response.data.results || [],
            count: response.data.count || 0,
            next: response.data.next || null,
            previous: response.data.previous || null,
            totalPages: Math.ceil((response.data.count || 0) / pageSize),
            currentPage: page,
            pageSize: pageSize,
            rawResponse: response.data
        };
    } catch (error) {
        console.error(`❌ Error fetching services with category ${category}:`, error);
        throw error;
    }
};

// Get featured services
export const getFeaturedServices = async (page = 1, pageSize = 10) => {
    console.log("⭐ Fetching featured services...");
    try {
        const response = await api.get("/service/", {
            params: {
                is_featured: true,
                is_active: true,
                page: page,
                page_size: pageSize,
            },
        });
        const services = response.data.results || [];
        console.log(`✅ Featured services fetched: ${services.length} services`);
        return {
            data: services,
            count: response.data.count || 0,
            next: response.data.next || null,
            previous: response.data.previous || null,
            totalPages: Math.ceil((response.data.count || 0) / pageSize),
            currentPage: page,
            pageSize: pageSize,
            rawResponse: response.data
        };
    } catch (error) {
        console.error("❌ Error fetching featured services:", error);
        throw error;
    }
};

// Search services - UPDATED to handle pagination
export const searchServices = async (query, page = 1, pageSize = 50) => {
    console.log(`🔍 Searching services with query: ${query}...`);
    try {
        const response = await api.get("/service/", {
            params: {
                search: query,
                is_active: true,
                page: page,
                page_size: pageSize,
            },
        });
        const services = response.data.results || [];
        console.log(`✅ Search results for "${query}": ${services.length} services`);
        return {
            data: services,
            count: response.data.count || 0,
            next: response.data.next || null,
            previous: response.data.previous || null,
            totalPages: Math.ceil((response.data.count || 0) / pageSize),
            currentPage: page,
            pageSize: pageSize,
            query: query,
            rawResponse: response.data
        };
    } catch (error) {
        console.error(`❌ Error searching services with query ${query}:`, error);
        throw error;
    }
};

// Batch delete services (admin only)
export const deleteServicesBatch = async (ids) => {
    console.log(`🗑️ Batch deleting services: ${ids.join(', ')}`);
    try {
        const response = await api.delete("/service/batch-delete/", { data: { ids } });
        console.log(`✅ ${ids.length} services deleted successfully`);
        return {
            data: response.data,
            status: response.status
        };
    } catch (error) {
        console.error(`❌ Error batch deleting services:`, error);
        throw error;
    }
};

// Get service statistics (admin only)
export const getServiceStats = async () => {
    console.log("📊 Fetching service statistics...");
    try {
        const response = await api.get("/service/stats/");
        console.log("✅ Service stats fetched:", response.data);
        return {
            data: response.data,
            status: response.status
        };
    } catch (error) {
        console.error("❌ Error fetching service stats:", error);
        throw error;
    }
};

// Get service by multiple filters - UPDATED to handle pagination
export const getServicesWithFilters = async (filters = {}, page = 1, pageSize = 100) => {
    console.log("🔍 Fetching services with filters:", filters);
    try {
        const params = {
            ...filters,
            page: page,
            page_size: pageSize,
        };
        const response = await api.get("/service/", { params });
        console.log(`✅ Services with filters fetched:`, response.data);
        return {
            data: response.data.results || [],
            count: response.data.count || 0,
            next: response.data.next || null,
            previous: response.data.previous || null,
            totalPages: Math.ceil((response.data.count || 0) / pageSize),
            currentPage: page,
            pageSize: pageSize,
            filters: filters,
            rawResponse: response.data
        };
    } catch (error) {
        console.error("❌ Error fetching services with filters:", error);
        throw error;
    }
};

// NEW: Helper function to extract pagination info from response
export const getPaginationInfo = (response) => {
    return {
        count: response.count || 0,
        next: response.next || null,
        previous: response.previous || null,
        results: response.results || [],
        hasNext: !!response.next,
        hasPrevious: !!response.previous,
    };
};

// NEW: Function to get services with page from URL (for SSR/static props)
export const getServicesFromUrl = async (url) => {
    console.log(`📡 Fetching services from URL: ${url}`);
    try {
        const response = await api.get(url);
        return {
            data: response.data.results || [],
            count: response.data.count || 0,
            next: response.data.next || null,
            previous: response.data.previous || null,
            rawResponse: response.data
        };
    } catch (error) {
        console.error("❌ Error fetching services from URL:", error);
        throw error;
    }
};

// NEW: Function to get all services (handles pagination automatically)
// This is the key function used by ServiceList.jsx to load the FULL dataset
// once, so the UI can then paginate/search entirely on the client side.
export const getAllServices = async () => {
    console.log("📦 Fetching all services (auto-pagination)...");
    let allServices = [];
    let nextUrl = null;
    let page = 1;
    const pageSize = 100;

    try {
        do {
            const response = await getServices(page, pageSize);
            allServices = [...allServices, ...response.data];
            nextUrl = response.next;
            page++;
        } while (nextUrl);

        console.log(`✅ All services fetched: ${allServices.length} services`);
        return {
            data: allServices,
            total: allServices.length
        };
    } catch (error) {
        console.error("❌ Error fetching all services:", error);
        throw error;
    }
};

// Export all functions as default object
export default {
    getServices,
    getServiceById,
    getServiceBySlug,
    getServiceBySectionId,
    addService,
    updateService,
    deleteService,
    toggleServiceStatus,
    getActiveServices,
    getServicesByCategory,
    getFeaturedServices,
    searchServices,
    deleteServicesBatch,
    getServiceStats,
    getServicesWithFilters,
    getPaginationInfo,
    getServicesFromUrl,
    getAllServices,
};