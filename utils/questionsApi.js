import axios from "axios";

const openTdb_url = axios.create({
  baseURL: "https://opentdb.com",
});

export const getCategories = (params = {}) => {
  return openTdb_url
    .get("/api_category.php", { params })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};
