import http from "../http.common";

const getCategoryMap = () => {
  return http.get("/category/map");
};
const getCategoryList = () => {
  return http.get("/category/list");
};

export default {
  getCategoryMap,
  getCategoryList,
};
