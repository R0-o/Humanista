import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TablePagination,
} from "@material-ui/core";
import CloudDownloadSharpIcon from "@material-ui/icons/CloudDownloadSharp";
import fileDownload from "js-file-download";

import FileService from "../../services/file/FileService";

const FileList = (props) => {
  const [files, setFiles] = useState([]);

  /**Pagination */

  const [totalItems, setTotalItems] = useState();
  const [page, setPage] = useState(0); //idx
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
  };

  /**FileName Render */

  const [fileName, setFileName] = useState(props.fileName);

  const getFilesByFileName = () => {
    let params = {};
    params["fileName"] = props.fileName;

    if (props.fileName !== "") {
      FileService.getFileListByFileName({ params })
        .then((res) => {
          const { files, totalPages } = res.data;
          setFiles(files);
        })
        .catch((e) => {
          //console.log(e);
        });
    } else {
      setFiles([]);
    }
  };

  useEffect(() => {
    setFileName(props.fileName);
  }, [props.fileName]);

  useEffect(getFilesByFileName, [props.fileName]);

  /**Category Render */
  const [category, setCategory] = useState(props.category);

  const getRequestParamsForCategory = (category, page, pageSize) => {
    let params = {};
    if (category) {
      params["categoryId"] = category;
    }

    if (page) {
      params["idx"] = page;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFilesByCategory = async () => {
    const params = getRequestParamsForCategory(category, page, rowsPerPage);

    await FileService.getFileListByCategory({ params })
      .then((res) => {
        const { files, totalItems } = res.data;

        setTotalItems(totalItems);
        setFiles(files);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    setCategory(props.category);
  }, [props.category]);

  useEffect(getFilesByCategory, [category, page, rowsPerPage]);

  /**File */

  const handleDownload = async (url, fileName) => {
    await FileService.downloadFile(url).then((res) => {
      console.log(res.data);
      fileDownload(res.data, fileName);
    });
  };

  return (
    <div className="container pt-5">
      <TableContainer>
        <Table className="col-12">
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.fileId}>
                <TableCell component="th" id={file.fileId} scope="row">
                  {file.fileName}
                </TableCell>
                {!props.category ? (
                  <TableCell>{file.category.name}</TableCell>
                ) : null}
                <TableCell>
                  <CloudDownloadSharpIcon
                    onClick={() => handleDownload(file.fileUrl, file.fileName)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {files.length && props.category > 0 ? (
        <TablePagination
          component="div"
          className="col-12"
          rowsPerPageOptions={[5, 10]}
          count={totalItems}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      ) : null}
    </div>
  );
};

export default FileList;
