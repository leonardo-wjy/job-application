/* eslint-disable */
import React from "react";

import CostumTable from "src/components/costum-table/CostumTable.js";
import CostumInput from "src/components/costum-input/CostumInput";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDebounce } from "src/utils/useDebounce";
import ButtonAction from "src/components/button/ButtonAction";
import { useQuery } from "react-query";
import ResponseError from "src/components/ResponseError";
import formAPI from "src/services/form";

const dataTitle = [
  {
    title: "Nama",
    fieldName: "nama",
    onSort: false,
  },
  {
    title: "Tempat & Tanggal Lahir",
    fieldName: "tempat_tanggal_lahir",
    onSort: false,
  },
  {
    title: "Posisi",
    fieldName: "posisi",
    onSort: false,
  }
];

function Index() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const DebounceSearch = useDebounce(search, 500);
  const [field, setField] = useState("createdAt");
  const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({
    currentPage: 1,
    pageCount: 0,
    pageSize: 10,
  });

  const actionList = [
    {
      name: "Lihat",
      onClick: (id) => handleEdit(id),
    },
  ];

  const onChangeLimit = (e) => {
    setPageSize(e.target.value);
    setCurrentPage(1);
  };

  const handlePre = (page) => {
    setCurrentPage(page - 1);
  };

  const handleNext = (page) => {
    setCurrentPage(page + 1);
  };

  const handlePageJump = (page) => {
    setCurrentPage(page);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    control,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  // GET ALL
  const { isLoading: isLoadingCategories, refetch } = useQuery(
    ["form", DebounceSearch, field, sort, currentPage, pageSize],
    () =>
      formAPI.getAll({
        sortField: field,
        sortType: sort,
        pageSize,
        currentPage,
        search: DebounceSearch,
      }),
    {
      onSuccess: (res) => {
        const { data, meta } = res;
        const newData = data.map((item) => ({
          id: item.user_id,
          nama: item.nama,
          tempat_tanggal_lahir: item.tempat_tanggal_lahir,
          posisi: item.posisi
        }));

        //check if table null data
        if (newData.length === 0) {
          setCurrentPage(1);
        }

        setData(newData);
        setMeta(meta);
      },
      onError: (err) => {
        ResponseError(err, dispatch, history);
      },
    }
  );

  const handleEdit = (id) => {
    history.push("/view/" + id);
  };

  return (
    <div>
      <>
        <div className="d-flex justify-content-between">
          {/* SEARCH sudah include handleSearch dan handleKeyPress enter */}
          <CostumInput
            type="search"
            placeholder="Search"
            setSearch={setSearch}
            setCurrentPage={setCurrentPage}
            refetch={refetch}
          />
        </div>

        <CostumTable
          dataTitle={dataTitle}
          data={data}
          loading={isLoadingCategories}
          isAction={true}
          actionList={actionList}
          // sort
          sort={sort}
          field={field}
          // entries
          pageSize={pageSize}
          onChangeLimit={onChangeLimit}
          // pagination
          currentPage={meta.currentPage}
          pageCount={meta.pageCount}
          handleNext={handleNext}
          handlePre={handlePre}
          handlePageJump={handlePageJump}
        />
      </>
    </div>
  );
}

export default Index;
