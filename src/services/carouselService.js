import api from "./api";

export const addCarousel = (data) => {
  return api.post("/carousel/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};