// src/services/carouselService.js
import api from "./api";

// Get all carousel items with pagination
export const getCarousels = (page = 1, limit = 10, search = "") => {
  console.log(`🚀 Fetching carousels - Page: ${page}, Limit: ${limit}, Search: "${search}"`);

  let url = `/carousel/?page=${page}&limit=${limit}`;
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }

  return api.get(url);
};

// Add a new carousel item (supports both video and image)
export const addCarousel = (formData) => {
  console.log("🚀 Adding new carousel item...");

  // Log FormData contents for debugging
  console.log("📦 FormData contents:");
  let hasMediaFile = false;
  for (let [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`  ${key}: ${value.name} (${value.type}, ${Math.round(value.size / 1024)}KB)`);
      hasMediaFile = true;
    } else {
      console.log(`  ${key}: ${value}`);
    }
  }

  // For create operation, ensure media_type is set
  if (!formData.has('media_type')) {
    // Determine media type from the file that's present
    if (formData.has('video') && formData.get('video') instanceof File) {
      formData.append('media_type', 'video');
      console.log("📹 Media type set to: video");
    } else if (formData.has('image') && formData.get('image') instanceof File) {
      formData.append('media_type', 'image');
      console.log("🖼️ Media type set to: image");
    } else {
      console.error("❌ No valid media file found in FormData");
      return Promise.reject(new Error("No media file provided"));
    }
  }

  // Log final data before sending
  console.log("📤 Final FormData to send:");
  for (let [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`  ${key}: ${value.name} (${value.type}, ${Math.round(value.size / 1024)}KB)`);
    } else {
      console.log(`  ${key}: ${value}`);
    }
  }

  // Don't set Content-Type header - let the browser set it with the boundary
  return api.post("/carousel/", formData, {
    headers: {
      'Content-Type': undefined,
    },
  });
};

// Update an existing carousel item
export const updateCarousel = (id, formData) => {
  console.log(`🔄 Updating carousel item ${id}...`);

  // Log FormData contents for debugging
  console.log("📦 FormData contents:");
  let hasFile = false;
  for (let [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`  ${key}: ${value.name} (${value.type}, ${Math.round(value.size / 1024)}KB)`);
      hasFile = true;
    } else {
      console.log(`  ${key}: ${value}`);
    }
  }

  // For update operations, only set media_type if we have a file
  if (hasFile && !formData.has('media_type')) {
    if (formData.has('video') && formData.get('video') instanceof File) {
      formData.append('media_type', 'video');
      console.log("📹 Media type set to: video");
    } else if (formData.has('image') && formData.get('image') instanceof File) {
      formData.append('media_type', 'image');
      console.log("🖼️ Media type set to: image");
    }
  }

  // Log final data before sending
  console.log("📤 Final FormData to send:");
  for (let [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`  ${key}: ${value.name} (${value.type}, ${Math.round(value.size / 1024)}KB)`);
    } else {
      console.log(`  ${key}: ${value}`);
    }
  }

  return api.patch(`/carousel/${id}/`, formData, {
    headers: {
      'Content-Type': undefined,
    },
  });
};

// Delete a carousel item
export const deleteCarousel = (id) => {
  console.log(`🗑️ Deleting carousel item ${id}...`);
  return api.delete(`/carousel/${id}/`);
};

// Helper function to add image carousel
export const addCarouselImage = (formData) => {
  console.log("🖼️ Adding image carousel...");
  formData.append('media_type', 'image');
  return api.post("/carousel/", formData);
};

// Helper function to add video carousel
export const addCarouselVideo = (formData) => {
  console.log("📹 Adding video carousel...");
  formData.append('media_type', 'video');
  return api.post("/carousel/", formData);
};

// Toggle carousel active status
export const toggleCarouselStatus = (id, isActive) => {
  console.log(`🔄 Toggling carousel ${id} status to: ${isActive}`);
  const formData = new FormData();
  formData.append('is_active', isActive ? 'true' : 'false');
  return api.patch(`/carousel/${id}/`, formData);
};

// Get a single carousel item by ID
export const getCarouselById = (id) => {
  console.log(`🔍 Fetching carousel item ${id}...`);
  return api.get(`/carousel/${id}/`);
};

// Batch delete carousel items
export const deleteCarouselsBatch = (ids) => {
  console.log(`🗑️ Batch deleting carousel items: ${ids.join(', ')}`);
  return api.delete("/carousel/batch-delete/", { data: { ids } });
};

// Update carousel order
export const updateCarouselOrder = (orderedIds) => {
  console.log(`🔄 Updating carousel order: ${orderedIds.join(', ')}`);
  return api.patch("/carousel/reorder/", { order: orderedIds });
};

// Custom error handler for carousel operations
export const handleCarouselError = (error) => {
  console.error("❌ Carousel API Error:", error);

  if (error.response) {
    console.error("📋 Response data:", error.response.data);
    console.error("📋 Response status:", error.response.status);
    console.error("📋 Response headers:", error.response.headers);

    if (error.response.status === 400) {
      const errorData = error.response.data;
      let errorMessage = "Invalid data provided. Please check your input.";

      if (typeof errorData === 'object') {
        const messages = Object.entries(errorData)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
          .join('\n');
        if (messages) {
          errorMessage = messages;
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
        message: "Carousel item not found.",
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

// Interceptor for logging all carousel API requests
api.interceptors.request.use(
  (config) => {
    if (config.url?.includes('/carousel/')) {
      console.log(`🔗 API Request: ${config.method.toUpperCase()} ${config.url}`);
      if (config.headers) {
        const safeHeaders = { ...config.headers };
        if (safeHeaders.Authorization) {
          safeHeaders.Authorization = 'Bearer [HIDDEN]';
        }
        console.log("📋 Request headers:", safeHeaders);
      }
    }
    return config;
  },
  (error) => {
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Interceptor for logging all carousel API responses
api.interceptors.response.use(
  (response) => {
    if (response.config.url?.includes('/carousel/')) {
      console.log(`✅ API Response: ${response.status} ${response.config.method.toUpperCase()} ${response.config.url}`);
      if (response.status === 200 || response.status === 201) {
        console.log("📦 Response data:", response.data);
      }
    }
    return response;
  },
  (error) => {
    if (error.config?.url?.includes('/carousel/')) {
      console.error(`❌ API Error: ${error.response?.status || 'Network Error'} ${error.config.method.toUpperCase()} ${error.config.url}`);
      console.error("Error details:", error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

// Default export with all functions
const carouselService = {
  getCarousels,
  addCarousel,
  updateCarousel,
  deleteCarousel,
  addCarouselImage,
  addCarouselVideo,
  toggleCarouselStatus,
  getCarouselById,
  deleteCarouselsBatch,
  updateCarouselOrder,
  handleCarouselError,
};

export default carouselService;