import React from "react";
import "../styles/general.css";
import FileUpload from "../components/files/FileUpload";

const AdminDashboard = (props) => {
  return (
    <div className="container ">
      <FileUpload />
    </div>
  );
};

export default AdminDashboard;
