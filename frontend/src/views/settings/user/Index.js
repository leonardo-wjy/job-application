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
import Swal from "sweetalert";
import { useQuery, useMutation } from "react-query";
import ResponseError from "src/components/ResponseError";
import UserAPI from "src/services/user";
import ModalDetails from "src/parts/settings/ModalDetails";
import Modals from "src/parts/settings/Modals";

const dataTitle = [
  {
    title: "Name",
    fieldName: "name",
    onSort: true,
  },
  {
    title: "Username",
    fieldName: "username",
    onSort: false,
  },
  {
    title: "Status",
    fieldName: "status",
    onSort: false,
  }
];

function Index() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const DebounceSearch = useDebounce(search, 500);
  const [field, setField] = useState("name");
  const [sort, setSort] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [idEdit, setIdEdit] = useState("");
  const [idDetail, setIdDetail] = useState("");

  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({
    currentPage: 1,
    pageCount: 0,
    pageSize: 10,
  });

  //
  const onSort = (key) => {
    setField(key);
    setSort(sort === "asc" ? "desc" : "asc");
  };

  const actionList = [
    {
      name: "Edit",
      onClick: (id) => handleEdit(id),
    },
    {
      name: "View",
      onClick: (id) => {
        setIdDetail(id);
        setShowModalDetail(true);
      },
    },
    {
      name: "Change Status",
      onClick: (id, url, status) => changeStatus(id, status),
    },
  ];

  const changeStatus = (id, status) => {
    Swal("Change status data?", {
      icon: "warning",
      dangerMode: true,
      buttons: {
        discard: {
          text: "Cancel",
          value: false,
        },
        save: {
          text: "Save",
          value: true,
        },
      },
    }).then((result) => {
      if (result) {
        // 0: block
        // 1: active
        updateStatus({ id });
      }
    });
  };

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
    ["user", DebounceSearch, field, sort, currentPage, pageSize],
    () =>
      UserAPI.getAll({
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
          id: item.id,
          route: item.id,
          name: item.name,
          username: item.username,
          status: item.status
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

  // CHANGE STATUS
  const { isLoading: isLoadingUpdateStatus, mutate: updateStatus } =
    useMutation(UserAPI.updateStatus, {
      onSuccess: (res) => {
        Swal(res.message, "", "success");

        refetch();
      },
      onError: (err) => {
        ResponseError(err, dispatch, history);
      },
    });

  // DELETE
  const { mutate: deleteUser } = useMutation((id) => UserAPI.delete(id), {
    onSuccess: (res) => {
      setShowModal(false);
      Swal("Deleted successfully!", {
        buttons: false,
        timer: 2000,
        icon: "success",
      });
      refetch();
    },
    onError: (err) => {
      ResponseError(err, dispatch, history);
    },
  });

  const handleCreate = () => {
    setIdEdit("");
    setShowModal(true);
  };

  const onClose = () => {
    setIdEdit("");
    setShowModal(false);
  };

  const onCloseDetail = () => {
    setIdDetail("");
    setShowModalDetail(false);
  };

  const handleEdit = (id) => {
    setIdEdit(id);
    setShowModal(true);
  };

  return (
    <div>
      <Modals
        visible={showModal}
        setShowModal={setShowModal}
        onClose={onClose}
        idEdit={idEdit}
        refetch={refetch}
      />
      <ModalDetails
        idDetail={idDetail}
        visible={showModalDetail}
        onClose={onCloseDetail}
      />
      <div className="d-flex mb-3 align-items-center">
        <h5 style={{ fontWeight: "700", margin: 0 }}>Manajemen User</h5>
      </div>
      <>
        <div className="d-flex justify-content-between">
          <ButtonAction
            type="add"
            text="Add New"
            onClick={handleCreate}
          />
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
          onSort={onSort}
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
