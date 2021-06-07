import React from "react";
import FileList from "../components/files/FilesList";

const Category = ({ match }) => {
  const {
    params: { categoryId },
  } = match;

  return (
    <>
      <br />
      <FileList category={categoryId} />
      <br />
    </>
  );
};

export default Category;
