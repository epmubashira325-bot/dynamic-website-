// src/hooks/useCarousel.js
import { useState, useEffect, useCallback } from 'react';
import { getCarousels } from '../services/carouselService';
import { SERVER_URL } from '../services/api';

const getMediaUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http') || path.startsWith('blob:')) return path;
    return `${SERVER_URL}${path}`;
};

export const useCarousel = () => {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSlides = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getCarousels();
            console.log('📊 Carousel API Response:', response);

            // Extract data from response
            let rawData = [];
            if (response.data?.results) {
                rawData = response.data.results;
            } else if (response.data?.data) {
                rawData = response.data.data;
            } else if (Array.isArray(response.data)) {
                rawData = response.data;
            } else if (Array.isArray(response)) {
                rawData = response;
            }

            // Filter only active items and format URLs
            const formattedSlides = rawData
                .filter(item => item.is_active === true)
                .map((item) => ({
                    id: item.id,
                    title: item.title,
                    media_type: item.media_type || (item.video ? 'video' : 'image'),
                    video: item.video ? getMediaUrl(item.video) : null,
                    image: item.image ? getMediaUrl(item.image) : null,
                    is_active: item.is_active,
                    created_at: item.created_at
                }));

            console.log(`✅ Found ${formattedSlides.length} active carousel slides`);
            setSlides(formattedSlides);

        } catch (err) {
            console.error('❌ Error fetching carousel slides:', err);
            setError(err.message || 'Failed to load carousel');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSlides();
    }, [fetchSlides]);

    return { slides, loading, error, refetch: fetchSlides };
};

export default useCarousel;