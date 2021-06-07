import React, { useState } from "react";
import { Button } from "reactstrap";
import { useAlert } from "react-alert";

import CategorySelector from "../files/CategorySelector";
import Dropzone from "./Dropzone";

import FileService from "../../services/file/FileService";
import "../../styles/general.css";

const FileUpload = () => {
  const [DTOFile, setDTOFile] = useState();
  const [category, setCategory] = useState();
  const [message, setMessage] = useState([]);
  const alert = useAlert();

  const selectFile = (props) => {
    setDTOFile(props);
  };

  const uploadFile = async () => {
    await FileService.uploadFile(DTOFile, category)
      .then((res) => {
        console.log(res.data.message);
        setMessage(res.data.message);
      })
      .catch((error) => {
        setMessage("El archvo excede el tamaño máximo");
        setDTOFile(undefined);
        console.log(error);
      });
    alert.show(message);
  };

  const selectCategory = (props) => {
    setCategory(props);
  };

  return (
    <div className="customContainer d-flex align-items-center justify-content-center m-0 ">
      <div className="container">
        <h2>File Upload</h2>
        <div className=" row d-flex align-items-center justify-content-center">
          <Dropzone dropFile={selectFile} />
        </div>
        <div className="row d-flex align-items-center justify-content-center">
          <CategorySelector selectCategory={selectCategory} />
          <Button
            className=" ml-3 mr-3 accent-color"
            color="secondary"
            onClick={uploadFile}
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
