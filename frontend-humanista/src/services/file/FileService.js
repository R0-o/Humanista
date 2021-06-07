import http from "../http.common";
import axios from "axios";

const uploadFile = (file, topic) => {
  let formData = new FormData();

  formData.append("file", file);
  formData.append("topic", topic);

  return http.post("/file/upload", formData, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
};

const getFileListByCategory = ({ params }) => {
  return http.get("/file/list/category_id", { params });
};

const getFileListByFileName = ({ params }) => {
  return http.get("/file/list/fileName", { params });
};

const downloadFile = (url) => {
  return axios.get(url, {
    responseType: "blob",
  });
};

export default {
  uploadFile,
  getFileListByCategory,
  getFileListByFileName,
  downloadFile,
};
