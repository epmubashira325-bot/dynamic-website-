import api, { SERVER_URL } from './api';

// Get all gallery items with pagination
export const getGalleryItems = async (page = 1, limit = 10, search = "") => {
    try {
        const safeLimit = Math.min(Math.max(1, parseInt(limit) || 10), 100);
        const safePage = Math.max(1, parseInt(page) || 1);
        const offset = (safePage - 1) * safeLimit;

        console.log(`🚀 Fetching gallery items - Page: ${safePage}, Limit: ${safeLimit}, Search: "${search}"`);

        let url = `/gallery/?page=${safePage}&page_size=${safeLimit}&limit=${safeLimit}&per_page=${safeLimit}&offset=${offset}`;
        if (search) {
            url += `&search=${encodeURIComponent(search)}`;
        }

        console.log(`📡 API Request URL: ${url}`);
        const response = await api.get(url);
        console.log("✅ Gallery API Response:", response.data);

        const returnedCount = Array.isArray(response.data?.results)
            ? response.data.results.length
            : Array.isArray(response.data)
                ? response.data.length
                : Array.isArray(response.data?.data)
                    ? response.data.data.length
                    : null;
        const backendTotal = response.data?.count ?? response.data?.total ?? returnedCount;

        if (returnedCount !== null && returnedCount < safeLimit && backendTotal > returnedCount) {
            console.warn(
                `⚠️ Requested ${safeLimit} items but backend returned ${returnedCount}. ` +
                `Your backend's pagination param name may not match page_size/limit/per_page/offset. ` +
                `Check your DRF pagination_class settings (and max_page_size).`
            );
        }

        return response.data;
    } catch (error) {
        console.error('❌ Error fetching gallery items:', error);
        throw error;
    }
};

// Get gallery items by category with pagination
export const getGalleryItemsByCategory = async (categoryId, page = 1, limit = 10) => {
    try {
        const safeLimit = Math.min(Math.max(1, parseInt(limit) || 10), 100);
        const safePage = Math.max(1, parseInt(page) || 1);
        const offset = (safePage - 1) * safeLimit;

        console.log(`🚀 Fetching gallery items for category ${categoryId} - Page: ${safePage}, Limit: ${safeLimit}`);

        let url = `/gallery/?gallery_category=${categoryId}&page=${safePage}&page_size=${safeLimit}&limit=${safeLimit}&per_page=${safeLimit}&offset=${offset}`;
        try {
            const response = await api.get(url);
            console.log("✅ Gallery items by category (gallery_category):", response.data);

            const items = Array.isArray(response.data?.results)
                ? response.data.results
                : Array.isArray(response.data)
                    ? response.data
                    : [];
            const wrongCategoryItems = items.filter(
                (it) => it.gallery_category && String(it.gallery_category) !== String(categoryId)
            );
            if (wrongCategoryItems.length > 0) {
                console.warn(
                    `⚠️ Backend returned ${wrongCategoryItems.length} item(s) NOT belonging to category ${categoryId}. ` +
                    `Your backend's /gallery/ view may not be filtering on the "gallery_category" query param.`
                );
            }

            return response.data;
        } catch (err) {
            console.log("ℹ️ First attempt failed, trying with category parameter...");
            url = `/gallery/?category=${categoryId}&page=${safePage}&page_size=${safeLimit}&limit=${safeLimit}&per_page=${safeLimit}&offset=${offset}`;
            const response = await api.get(url);
            console.log("✅ Gallery items by category (category):", response.data);
            return response.data;
        }
    } catch (error) {
        console.error('❌ Error fetching gallery items by category:', error);
        throw error;
    }
};

// Get a single gallery item by ID
export const getGalleryItem = async (id) => {
    try {
        const response = await api.get(`/gallery/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching gallery item:', error);
        throw error;
    }
};

// Create a new gallery item
export const createGalleryItem = async (formData) => {
    try {
        console.log("➕ Creating new gallery item...");
        console.log("📦 FormData contents:");
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`  ${key}: ${value.name} (${value.type}, ${Math.round(value.size / 1024)}KB)`);
            } else {
                console.log(`  ${key}: ${value}`);
            }
        }

        const response = await api.post('/gallery/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("✅ Gallery item created:", response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error creating gallery item:', error);
        if (error.response?.data) {
            console.error('Error details:', error.response.data);
        }
        throw error;
    }
};

// Update a gallery item
export const updateGalleryItem = async (id, formData) => {
    try {
        console.log(`🔄 Updating gallery item ${id}...`);
        console.log("📦 FormData contents:");
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`  ${key}: ${value.name} (${value.type}, ${Math.round(value.size / 1024)}KB)`);
            } else {
                console.log(`  ${key}: ${value}`);
            }
        }

        const response = await api.patch(`/gallery/${id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("✅ Gallery item updated:", response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error updating gallery item:', error);
        if (error.response?.data) {
            console.error('Error details:', error.response.data);
        }
        throw error;
    }
};

// Delete a gallery item
export const deleteGalleryItem = async (id) => {
    try {
        console.log(`🗑️ Deleting gallery item ${id}...`);
        const response = await api.delete(`/gallery/${id}/`);
        console.log("✅ Gallery item deleted");
        return response.data;
    } catch (error) {
        console.error('❌ Error deleting gallery item:', error);
        throw error;
    }
};

// Toggle gallery item status (active/inactive)
export const toggleGalleryStatus = async (id) => {
    try {
        console.log(`🔄 Toggling status for gallery item ${id}...`);
        const response = await api.patch(`/gallery/${id}/toggle-status/`);
        console.log("✅ Status toggled:", response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error toggling gallery status:', error);
        throw error;
    }
};

// Batch delete gallery items
export const deleteGalleryItemsBatch = async (ids) => {
    try {
        console.log(`🗑️ Batch deleting gallery items: ${ids.join(', ')}`);
        const response = await api.delete("/gallery/batch-delete/", { data: { ids } });
        return response.data;
    } catch (error) {
        console.error('❌ Error batch deleting gallery items:', error);
        throw error;
    }
};

// Get all gallery categories
export const getGalleryCategories = async () => {
    try {
        console.log("📂 Fetching gallery categories...");

        // FIXED: was hitting '/gallery-categories/' (plural), which 404s.
        // create/update/delete are confirmed working at the SINGULAR base
        // path '/gallery-category/' — standard DRF routers map GET for the
        // list to that same base path, not a separate plural URL. Because
        // this call was silently failing, the catch block below was firing
        // and returning { data: [] }, meaning the UI fell back to the
        // hardcoded FALLBACK_CATEGORIES every time — which is exactly why
        // new/edited/deleted categories never showed up after a refresh.
        const response = await api.get('/gallery-category/');
        console.log("✅ Categories from API endpoint:", response.data);

        let categoriesData = [];
        if (response.data) {
            if (Array.isArray(response.data)) {
                categoriesData = response.data;
            } else if (response.data.results && Array.isArray(response.data.results)) {
                categoriesData = response.data.results;
            } else if (response.data.data && Array.isArray(response.data.data)) {
                categoriesData = response.data.data;
            }
        }

        return { data: categoriesData };
    } catch (error) {
        console.error('❌ Error fetching gallery categories:', error);
        return { data: [] };
    }
};

// Create a new gallery category
export const createGalleryCategory = async (categoryData) => {
    try {
        console.log("➕ Creating new gallery category...");
        // CONFIRMED WORKING via network tab: POST /api/gallery-category/ (singular)
        // returns 200 with { message, data: {...} }.
        const response = await api.post('/gallery-category/', categoryData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("✅ Gallery category created:", response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error creating gallery category:', error);
        if (error.response?.data) {
            console.error('Error details:', error.response.data);
        }
        throw error;
    }
};

// Update an existing gallery category
export const updateGalleryCategory = async (id, categoryData) => {
    try {
        console.log(`🔄 Updating gallery category ${id}...`);
        // Matches the confirmed working base path: /gallery-category/{id}/
        const response = await api.patch(`/gallery-category/${id}/`, categoryData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("✅ Gallery category updated:", response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error updating gallery category:', error);
        if (error.response?.data) {
            console.error('Error details:', error.response.data);
        }
        throw error;
    }
};

// Delete a gallery category
export const deleteGalleryCategory = async (id) => {
    try {
        console.log(`🗑️ Deleting gallery category ${id}...`);
        // Matches the confirmed working base path: /gallery-category/{id}/
        const response = await api.delete(`/gallery-category/${id}/`);
        console.log("✅ Gallery category deleted");
        return response.data;
    } catch (error) {
        console.error('❌ Error deleting gallery category:', error);
        throw error;
    }
};

// Helper function to get category name by ID
export const getCategoryName = async (categoryId) => {
    try {
        const response = await getGalleryCategories();
        const categories = response.data || [];
        const found = categories.find(c => c.id === categoryId);
        return found?.name || `Category ${categoryId}`;
    } catch (error) {
        return `Category ${categoryId}`;
    }
};

// Helper function to get all categories as a map
export const getCategoryMap = async () => {
    try {
        const response = await getGalleryCategories();
        const categories = response.data || [];
        const map = new Map();
        categories.forEach(cat => {
            map.set(cat.id, cat.name);
        });
        return map;
    } catch (error) {
        return new Map();
    }
};

// Custom error handler for gallery operations
export const handleGalleryError = (error) => {
    console.error("❌ Gallery API Error:", error);

    if (error.response) {
        console.error("📋 Response data:", error.response.data);
        console.error("📋 Response status:", error.response.status);

        if (error.response.status === 400) {
            const errorData = error.response.data;
            let errorMessage = "Invalid data provided. Please check your input.";

            if (typeof errorData === 'object') {
                if (errorData.gallery_category) {
                    const categoryError = Array.isArray(errorData.gallery_category)
                        ? errorData.gallery_category.join(', ')
                        : errorData.gallery_category;
                    errorMessage = `Category error: ${categoryError}`;
                } else {
                    const messages = Object.entries(errorData)
                        .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
                        .join('\n');
                    if (messages) {
                        errorMessage = messages;
                    }
                }
            } else if (typeof errorData === 'string') {
                errorMessage = errorData;
            }

            return {
                message: errorMessage,
                details: errorData
            };
        } else if (error.response.status === 401) {
            return {
                message: "Authentication required. Please log in again.",
                details: error.response.data
            };
        } else if (error.response.status === 403) {
            return {
                message: "You don't have permission to perform this action.",
                details: error.response.data
            };
        } else if (error.response.status === 404) {
            return {
                message: "Resource not found.",
                details: error.response.data
            };
        } else if (error.response.status === 500) {
            return {
                message: "Server error. Please try again later.",
                details: error.response.data
            };
        }

        return {
            message: error.response.data?.message || error.response.data?.detail || "An error occurred.",
            details: error.response.data
        };
    } else if (error.request) {
        console.error("📋 No response received:", error.request);
        return {
            message: "Network error. Please check your connection.",
            details: error.request
        };
    } else {
        console.error("📋 Request setup error:", error.message);
        return {
            message: "Failed to process request.",
            details: error.message
        };
    }
};

const galleryService = {
    getGalleryItems,
    getGalleryItemsByCategory,
    getGalleryItem,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    toggleGalleryStatus,
    deleteGalleryItemsBatch,
    getGalleryCategories,
    createGalleryCategory,
    updateGalleryCategory,
    deleteGalleryCategory,
    getCategoryName,
    getCategoryMap,
    handleGalleryError,
};

export default galleryService;
export { SERVER_URL };