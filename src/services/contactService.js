// src/services/contactService.js
// TEMPORARY: hardcoded until we confirm where SERVER_URL actually lives in this project.
// Replace with the shared import once you find it (see carouselService.js for reference).
const SERVER_URL = 'http://192.168.1.38:8000';

const CONTACT_API_URL = `${SERVER_URL}/api/contact/`;

export const submitContactForm = async (formData) => {
    const response = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        let errorMessage = 'Failed to send message. Please try again.';
        try {
            const errorData = await response.json();
            // Django REST Framework often returns field-level errors like
            // { "email": ["Enter a valid email address."] }
            const firstKey = Object.keys(errorData)[0];
            if (firstKey && Array.isArray(errorData[firstKey])) {
                errorMessage = errorData[firstKey][0];
            } else if (errorData.detail) {
                errorMessage = errorData.detail;
            }
        } catch (_) {
            // response wasn't JSON, fall back to default message
        }
        throw new Error(errorMessage);
    }

    return response.json();
};