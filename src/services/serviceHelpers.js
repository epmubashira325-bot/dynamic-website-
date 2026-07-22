// src/services/serviceHelpers.js
import { SERVER_URL } from "./api";

export const emptyForm = {
    title: "",
    description: "",
    image: null,
    is_active: true,
    icon: "FaDraftingCompass",
};

export const getMediaUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http") || path.startsWith("blob:")) return path;
    return `${SERVER_URL}${path}`;
};