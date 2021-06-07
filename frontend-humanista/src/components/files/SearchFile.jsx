import React, { useState } from "react";
import { Input } from "reactstrap";

import FilesList from "../files/FilesList";

const SearchFile = () => {
  const [search, setSearch] = useState();

  const searchInput = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setSearch("");
    }
  };

  return (
    <>
      <Input
        className="bg-color row shadow p-3 mb-5 bg-body rounded mt-5"
        placeholder="Buscar..."
        value={search}
        name="search"
        onChange={searchInput}
      />
      <FilesList fileName={search} />
    </>
  );
};

export default SearchFile;
