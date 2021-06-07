import React, { useState, useEffect } from "react";
import Select from "react-select";
import CategoryService from "../../services/file/CategoryService";

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "#bdc7c9d" }),
};

const CategorySelector = (props) => {
  const [categoryOptions, setCategoryOptions] = useState();

  const handleSelect = (e) => {
    props.selectCategory(e.label);
  };

  useEffect(() => {
    CategoryService.getCategoryMap().then(
      (res) => {
        const arr = Object.entries(res.data).map(([value, label]) => ({
          value,
          label,
        }));
        setCategoryOptions(arr);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div className="col-6">
      <Select
        placeholder="Select category..."
        onChange={handleSelect}
        options={categoryOptions}
        styles={colourStyles}
        on
      />
    </div>
  );
};

export default CategorySelector;
