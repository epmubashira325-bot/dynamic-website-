import api from "./api";

export const getFooter = () => {
  return api.get("/footer/");
};