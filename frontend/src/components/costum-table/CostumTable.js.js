/* eslint-disable react/prop-types */
import React from "react";
import {
  CCol,
  CFormCheck,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react-pro";
import ButtonAction from "../button/ButtonAction";
import ShowEntries from "../show-entries/ShowEntries";
import Pagination from "../pagination/Pagination";
import colors from "src/utils/colors";

import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import { HiDotsVertical } from "react-icons/hi";

// ON SORT
// const onSort = (key) => {
//   setField(key);
//   setSort(sort === "asc" ? "desc" : "asc");
// };

function CostumTable({
  // title
  dataTitle = [],

  // sort
  onSort,
  sort,
  field,

  // data
  loading,
  data = [],

  // entries
  pageSize,
  onChangeLimit,

  // pagination
  currentPage = 1,
  pageCount,
  handleNext,
  handlePre,
  handlePageJump,

  // is not pagination
  notPaginated,

  // action
  onClickField, // name field
  onClickAction,

  isAction,
  actionList = [],

  // checklist
  dataChecklist = [],
  handleCheck,
}) {
  return (
    <>
      {/* TABLE */}
      <CRow className="mt-4">
        <CCol className="p-0">
          <CTable
            // striped
            hover
            responsive={true}
            className="table-data"
            borderless
            style={{
              borderRight: `1px solid ${colors.borderTable}`,
              borderLeft: `1px solid ${colors.borderTable}`,
              borderBottom: `1px solid ${colors.borderTable}`,
              marginBottom: "0px",
              // borderCollapse: "separate",
              // borderSpacing: "2px",
            }}
          >
            <CTableHead
              style={{
                background: colors.backgroundTitle,
                border: `1px solid ${colors.borderTable}`,
              }}
            >
              <CTableRow>
                {dataTitle.map((item, index) => (
                  <CTableHeaderCell
                    key={index}
                    scope="col"
                    onClick={item.onSort ? () => onSort(item.fieldName) : null}
                    style={{ cursor: item.onSort ? "pointer" : "default" }}
                  >
                    {item.onSort && (
                      <>
                        {field === item.fieldName ? (
                          <ButtonAction type="sort" sortValue={sort} />
                        ) : (
                          <ButtonAction type="sort" />
                        )}
                      </>
                    )}
                    {item.title}
                  </CTableHeaderCell>
                ))}
                {isAction && (
                  <CTableHeaderCell
                    style={{ width: "15%" }}
                    scope="col"
                  ></CTableHeaderCell>
                )}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {loading ? (
                <CSpinner />
              ) : (
                <>
                  {data.length > 0 ? (
                    data.map((item) => (
                      <CTableRow
                        key={item.id}
                        style={{
                          borderBottom: `1px solid ${colors.borderTable}`,
                          background: colors.white,
                        }}
                      >
                        {Object.keys(item).map((key, index) =>
                          key === "id" ||
                          key === "route" ||
                          key === "linkUrlWithoutView" ? null : key ===
                            "backgroundImage_backround" ? (
                            <CTableDataCell align="middle" key={index}>
                              <img
                                src={item[key]}
                                alt="banner"
                                width={50}
                                height={50}
                                style={{
                                  objectFit: "cover",
                                  backgroundColor: colors.green,
                                }}
                              />
                            </CTableDataCell>
                          ) : key === "checkbox" ? (
                            <CTableDataCell align="middle" key={index}>
                              <CFormCheck
                                checked={dataChecklist?.includes(item.id)}
                                onChange={() => handleCheck(item.id)}
                              />
                            </CTableDataCell>
                          ) : key === "image" || key === "poster" ? (
                            <CTableDataCell align="middle" key={index}>
                              <img
                                src={item[key]}
                                alt="banner"
                                width={50}
                                height={50}
                                style={{
                                  objectFit: "cover",
                                }}
                              />
                            </CTableDataCell>
                          ) : (
                            <CTableDataCell
                              align="middle"
                              key={index}
                              // align="center"
                              style={{
                                cursor:
                                  onClickField === key ? "pointer" : "default",
                              }}
                              onClick={
                                onClickField === key
                                  ? () => onClickAction(item.route)
                                  : null
                              }
                            >
                              {item[key]}
                            </CTableDataCell>
                          )
                        )}
                        {isAction && (
                          <CTableDataCell
                            className="text-center"
                            align="middle"
                          >
                            {actionList.length > 0 && (
                              <Menu
                                menuButton={
                                  <div style={{ cursor: "pointer" }}>
                                    <HiDotsVertical />
                                  </div>
                                }
                                transition
                              >
                                {actionList.length > 0 &&
                                  actionList.map((action, index) => (
                                    <MenuItem
                                      key={index}
                                      onClick={() =>
                                        action.onClick(
                                          item.id,
                                          item.linkUrl,
                                          item.status,
                                          item.linkUrlWithoutView,
                                          item.slug
                                        )
                                      }
                                    >
                                      {action.name}
                                    </MenuItem>
                                  ))}
                              </Menu>
                            )}
                          </CTableDataCell>
                        )}
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow className="fst-italic text-center">
                      <CTableDataCell colSpan="5">No Data</CTableDataCell>
                    </CTableRow>
                  )}
                </>
              )}
            </CTableBody>
          </CTable>
        </CCol>
      </CRow>

      {notPaginated ? (
        <></>
      ) : (
        <>
          {/* PAGINATION */}
          {data.length > 0 && (
            <CRow>
              <CCol
                className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-center gap-3"
                style={{
                  background: colors.backgroundTitle,
                  border: `1px solid ${colors.borderTable}`,
                  borderTop: "none",
                }}
              >
                <ShowEntries
                  projectPerPage={pageSize}
                  onChangeLimit={onChangeLimit}
                />

                <Pagination
                  currentPage={currentPage}
                  pageCount={pageCount}
                  handleNext={handleNext}
                  handlePre={handlePre}
                  handlePageJump={handlePageJump}
                />
              </CCol>
            </CRow>
          )}
        </>
      )}
    </>
  );
}

export default CostumTable;
