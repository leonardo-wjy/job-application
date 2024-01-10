/* eslint-disable react/prop-types */
import React from "react";
import { CPagination, CPaginationItem } from "@coreui/react-pro";
import "./Pagination.scss";

const Pagination = ({
  currentPage,
  pageCount,
  handleNext,
  handlePre,
  handlePageJump,
}) => {
  return (
    <CPagination className="mb-0">
      {currentPage === 1 ? (
        <>
          {currentPage === 1 && pageCount === 1 ? (
            <>
              {/* <CPaginationItem disabled={true}>{"First"}</CPaginationItem> */}
              <CPaginationItem disabled={true}>{"Previous"}</CPaginationItem>
              <CPaginationItem active={true}>{currentPage}</CPaginationItem>
              <CPaginationItem disabled={true}>{"Next"}</CPaginationItem>
              {/* <CPaginationItem disabled={true}>{"Last"}</CPaginationItem> */}
            </>
          ) : (
            <>
              {/* <CPaginationItem disabled={true}>{"First"}</CPaginationItem> */}
              <CPaginationItem disabled={true}>{"Previous"}</CPaginationItem>
              <CPaginationItem active={true}>{currentPage}</CPaginationItem>
              {pageCount === currentPage + 1 ? (
                <>
                  <CPaginationItem onClick={() => handleNext(currentPage)}>
                    {currentPage + 1}
                  </CPaginationItem>
                  <CPaginationItem onClick={() => handleNext(currentPage)}>
                    {"Next"}
                  </CPaginationItem>
                  {/* <CPaginationItem onClick={() => handlePageJump(pageCount)}>
                    {"Last"}
                  </CPaginationItem> */}
                </>
              ) : (
                <>
                  <CPaginationItem onClick={() => handleNext(currentPage)}>
                    {currentPage + 1}
                  </CPaginationItem>
                  <CPaginationItem onClick={() => handleNext(currentPage + 1)}>
                    {currentPage + 2}
                  </CPaginationItem>
                  <CPaginationItem onClick={() => handleNext(currentPage)}>
                    {"Next"}
                  </CPaginationItem>
                  {/* <CPaginationItem onClick={() => handlePageJump(pageCount)}>
                    {"Last"}
                  </CPaginationItem> */}
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {/* <CPaginationItem onClick={() => handlePageJump(1)}>
            {"First"}
          </CPaginationItem> */}
          <CPaginationItem onClick={() => handlePre(currentPage)}>
            {"Previous"}
          </CPaginationItem>
          <CPaginationItem onClick={() => handlePre(currentPage)}>
            {currentPage - 1}
          </CPaginationItem>
          <CPaginationItem active={true}>{currentPage}</CPaginationItem>
          {currentPage !== pageCount ? (
            <>
              <CPaginationItem onClick={() => handleNext(currentPage)}>
                {currentPage + 1}
              </CPaginationItem>
              <CPaginationItem onClick={() => handleNext(currentPage)}>
                {"Next"}
              </CPaginationItem>
              {/* <CPaginationItem onClick={() => handlePageJump(pageCount)}>
                {"Last"}
              </CPaginationItem> */}
            </>
          ) : (
            <>
              <CPaginationItem disabled={true}>{"Next"}</CPaginationItem>
              {/* <CPaginationItem disabled={true}>{"Last"}</CPaginationItem> */}
            </>
          )}
        </>
      )}
    </CPagination>
  );
};

export default Pagination;
