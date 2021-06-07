import React from "react";
import Dropzone from "react-dropzone";
import "../../styles/dropzone.css";

const FileUpload = (props) => {
  const maxSize = 10485760;

  const handleDrop = (acceptedFiles) => {
    props.dropFile(acceptedFiles[0]);
    console.log(acceptedFiles[0]);
  };

  return (
    <Dropzone
      onDrop={handleDrop}
      accept="application/pdf"
      multiple={false}
      maxFiles={1}
      maxSize={maxSize}
    >
      {({ getRootProps, getInputProps, isDragAccept, isDragReject }) => {
        const additionalClass = isDragAccept
          ? "accept"
          : isDragReject
          ? "reject"
          : "";
        return (
          <div
            {...getRootProps({
              className: `dropzone ${additionalClass}`,
            })}
          >
            <input {...getInputProps()} />
            Drag'n'drop files, or click to select files
          </div>
        );
      }}
    </Dropzone>
  );
};

export default FileUpload;
