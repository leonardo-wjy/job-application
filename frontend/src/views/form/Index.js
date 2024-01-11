/* eslint-disable react/prop-types */
import {
  CCard,
  CCardBody,
  CCol,
  CForm,
  CRow,
} from "@coreui/react-pro";
import React, { useState } from "react";
import colors from "src/utils/colors";
import ButtonAction from "src/components/button/ButtonAction";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import formAPI from "src/services/form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert";
import CostumInput from "src/components/costum-input/CostumInput";
import { addCommas, removeNonNumeric } from "src/utils/formatRp";
import ResponseError from "src/components/ResponseError";

function Index() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useSelector((state) => state.user.data);

  const [agama, setAgama] = useState([]);
  const [golongan_darah, setGolonganDarah] = useState([]);
  const [status, setStatus] = useState([]);
  const [bersedia_penempatan, setBersediaPenempatan] = useState([]);
  const [isNew, setIsNew] = useState(true);

  const agamaOption = [
    {value: 'Islam', label: 'Islam'},
    {value: 'Kristen Protestan', label: 'Kristen Protestan'},
    {value: 'Kristen Katolik', label: 'Kristen Katolik'},
    {value: 'Budha', label: 'Budha'},
    {value: 'Konghucu', label: 'Konghucu'},
    {value: 'Lainnya', label: 'Lainnya'}
  ];

  const golonganDarahOption = [
    {value: 'A', label: 'A'},
    {value: 'B', label: 'B'},
    {value: 'AB', label: 'AB'},
    {value: 'O', label: 'O'}
  ];

  const statusOption = [
    {value: 'Belum Menikah', label: 'Belum Menikah'},
    {value: 'Menikah', label: 'Menikah'},
    {value: 'Cerai', label: 'Cerai'},
    {value: 'Janda', label: 'Janda'},
    {value: 'Duda', label: 'Duda'}
  ];

  const confirm = [
    {value: 'Ya', label: 'Ya'},
    {value: 'Tidak', label: 'Tidak'}
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    control,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      posisi: "",
      nama: "",
      no_ktp: "",
      tempat_tanggal_lahir: "",
      agama: [],
      golongan_darah: [],
      status: [],
      alamat_ktp: "",
      alamat_tinggal: "",
      email: "",
      no_telp: "",
      orang_terdekat: "",
      skill: "",
      bersedia_penempatan: [],
      penghasilan_harapan: ""
    },
  });

  const { fields: pendidikanFields, append: appendPendidikan, remove: removePendidikan } = useFieldArray({
    control,
    name: "pendidikan",
  });

  const { fields: pelatihanFields, append: appendPelatihan, remove: removePelatihan } = useFieldArray({
    control,
    name: "pelatihan",
  });

  const { fields: pekerjaanFields, append: appendPekerjaan, remove: removePekerjaan } = useFieldArray({
    control,
    name: "pekerjaan",
  });

  // GET
  const { isLoading: isLoading } = useQuery(
    ["get-by-id", id],
    () => formAPI.getById({ id: id }),
    {
      enabled: id !== false,
      onSuccess: (res) => {
        const data = res.data;
        setValue("posisi", data.posisi);
        setValue("nama", data.nama);
        setValue("no_ktp", data.no_ktp);
        setValue("tempat_tanggal_lahir", data.tempat_tanggal_lahir);
        setValue("agama", { value: data.agama, label: data.agama });
        setAgama({ value: data.agama, label: data.agama });
        setValue("golongan_darah", { value: data.golongan_darah, label: data.golongan_darah });
        setGolonganDarah({ value: data.golongan_darah, label: data.golongan_darah });
        setValue("status", { value: data.status, label: data.status });
        setStatus({ value: data.status, label: data.status });
        setValue("email", data.email);
        setValue("alamat_ktp", data.alamat_ktp);
        setValue("alamat_tinggal", data.alamat_tinggal);
        setValue("no_telp", data.no_telp);
        setValue("orang_terdekat", data.orang_terdekat);
        setValue("skill", data.skill);
        setValue("bersedia_penempatan", { value: data.bersedia_penempatan, label: data.bersedia_penempatan });
        setBersediaPenempatan({ value: data.bersedia_penempatan, label: data.bersedia_penempatan });
        setValue("penghasilan_harapan", addCommas(removeNonNumeric(data.penghasilan_harapan)));
        if (Array.isArray(res?.dataPendidikan)) {
          res?.dataPendidikan.forEach((value, index) => {
            appendPendidikan({ jenjang_pendidikan: value.jenjang_pendidikan, institusi: value.institusi, jurusan: value.jurusan, tahun_lulus: value.tahun_lulus, ipk: value.ipk });
          });
        }
        if (Array.isArray(res?.dataPelatihan)) {
          res?.dataPelatihan.forEach((value, index) => {
            appendPelatihan({ nama: value.nama, sertifikat: value.sertifikat, tahun: value.tahun });
          });
        }
        if (Array.isArray(res?.dataPekerjaan)) {
          res?.dataPekerjaan.forEach((value, index) => {
            appendPekerjaan({ perusahaan: value.perusahaan, posisi: value.posisi, tahun: value.tahun, pendapatan: value.pendapatan });
          });
        }
      },
      onError: (err) => {
        if(err?.response?.status === 400)
        {
          setIsNew(false);
        }
      },
    }
  );

  const onSubmit = (data) => {
    Swal("Save data?", {
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
        let newData = {
          ...data,
          agama: data.agama.value ? data.agama.value : 0,
          golongan_darah: data.golongan_darah.value ? data.golongan_darah.value : 0,
          status: data.status.value ? data.status.value : 0,
          bersedia_penempatan: data.bersedia_penempatan.value ? data.bersedia_penempatan.value : 0,
          penghasilan_harapan: data.penghasilan_harapan?.replaceAll(",", "").toLocaleString()
        };
        update({ id: id, params: newData });
      }
    });
  };

  const { mutate: update } =
    useMutation(formAPI.create, {
      onSuccess: (res) => {
        Swal(res.message, "", "success");
        setIsNew(true);
      },
      onError: (err) => {
        ResponseError(err, dispatch, history);
      },
    });

  const handleChangeAgama = (newValue, actionMeta) => {
    if (actionMeta.action === "select-option") {
      if (newValue) {
        setValue("agama", newValue);
      }
    } else if (actionMeta.action === "clear") {
      setValue("agama", []);
    }
  };

  const handleChangeGolonganDarah = (newValue, actionMeta) => {
    if (actionMeta.action === "select-option") {
      if (newValue) {
        setValue("golongan_darah", newValue);
      }
    } else if (actionMeta.action === "clear") {
      setValue("golongan_darah", []);
    }
  };

  const handleChangeStatus = (newValue, actionMeta) => {
    if (actionMeta.action === "select-option") {
      if (newValue) {
        setValue("status", newValue);
      }
    } else if (actionMeta.action === "clear") {
      setValue("status", []);
    }
  };

  const handleChangeBersedia = (newValue, actionMeta) => {
    if (actionMeta.action === "select-option") {
      if (newValue) {
        setValue("bersedia_penempatan", newValue);
      }
    } else if (actionMeta.action === "clear") {
      setValue("bersedia_penempatan", []);
    }
  };

  const handleChangeSalary = (e) => {
    let separate = parseInt(e.target.value.replaceAll(",", ""));
    setValue("penghasilan_harapan", addCommas(removeNonNumeric(separate)));
  };

  return (
    <div>
      <CCard className="mb-5 shadow-none border rounded-0">
        {/* HEADER */}
        <div
          style={{ background: colors.gray2, padding: "10px" }}
          className="d-flex justify-content-end align-items-center"
        >
        {isNew ? 
          <></> :
          <ButtonAction
            type="save"
            onClick={handleSubmit(onSubmit)}
          />
        }
        </div>

        <CCardBody>
          <CRow>
            <CForm>
              <CRow className="mt-2">
                <CCol md={6}>
                  <CostumInput
                    register={register}
                    label="POSISI YANG DILAMAR"
                    name="posisi"
                    type="text"
                    errors={errors}
                    isReqMsg="Required"
                    disabled={isNew}
                  />
                </CCol>
                <CCol md={6}>
                  <CostumInput
                    register={register}
                    label="NAMA"
                    name="nama"
                    type="text"
                    errors={errors}
                    isReqMsg="Required"
                    disabled={isNew}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol md={6}>
                  <CostumInput
                    register={register}
                    label="NO. KTP"
                    name="no_ktp"
                    type="text"
                    phone={true}
                    minLength={16}
                    minLengthMsg="Panjang nomor ktp adalah 16 digit"
                    maxLengthMsg="Panjang nomor ktp adalah 16 digit"
                    maxLength={16}
                    errors={errors}
                    isReqMsg="Required"
                    disabled={isNew}
                  />
                </CCol>
                <CCol md={6}>
                  <CostumInput
                    register={register}
                    label="TEMPAT, TANGGAL LAHIR"
                    name="tempat_tanggal_lahir"
                    type="text"
                    errors={errors}
                    isReqMsg="Required"
                    disabled={isNew}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol md={6}>
                  <CostumInput
                      type="select"
                      label="AGAMA"
                      controller={Controller}
                      control={control}
                      isClearable={true}
                      name="agama.value"
                      placeholder={"Agama"}
                      handleSelect={handleChangeAgama}
                      register={register}
                      nameParent="agama"
                      dataSelect={agamaOption}
                      isReqMsg="Required"
                      errors={errors}
                      disabled={isNew}
                    />
                </CCol>
                <CCol md={6}>
                  <CostumInput
                      type="select"
                      label="GOLONGAN DARAH"
                      controller={Controller}
                      control={control}
                      isClearable={true}
                      name="golongan_darah.value"
                      placeholder={"Golongan Darah"}
                      handleSelect={handleChangeGolonganDarah}
                      register={register}
                      nameParent="golongan_darah"
                      dataSelect={golonganDarahOption}
                      isReqMsg="Required"
                      errors={errors}
                      disabled={isNew}
                    />
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol md={6}>
                  <CostumInput
                      type="select"
                      label="STATUS"
                      controller={Controller}
                      control={control}
                      isClearable={true}
                      name="status.value"
                      placeholder={"Status"}
                      handleSelect={handleChangeStatus}
                      register={register}
                      nameParent="status"
                      dataSelect={statusOption}
                      isReqMsg="Required"
                      errors={errors}
                      disabled={isNew}
                    />
                </CCol>
                <CCol md={6}>
                  <CostumInput
                    register={register}
                    label="EMAIL"
                    name="email"
                    type="email"
                    errors={errors}
                    isReqMsg="Required"
                    patternMsg="Email is not valid"
                    disabled={isNew}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol md={12}>
                  <CostumInput
                    register={register}
                    label="ALAMAT KTP"
                    name="alamat_ktp"
                    type="textarea"
                    errors={errors}
                    isReqMsg="Required"
                    disabled={isNew}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol md={12}>
                  <CostumInput
                    register={register}
                    label="ALAMAT TINGGAL"
                    name="alamat_tinggal"
                    type="textarea"
                    errors={errors}
                    isReqMsg="Required"
                    disabled={isNew}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol md={6}>
                  <CostumInput
                    register={register}
                    label="NO. TELP"
                    name="no_telp"
                    type="text"
                    phone={true}
                    errors={errors}
                    isReqMsg="Required"
                    disabled={isNew}
                  />
                </CCol>
                <CCol md={6}>
                  <CostumInput
                    register={register}
                    label="ORANG TERDEKAT YANG DAPAT DIHUBUNGI"
                    name="orang_terdekat"
                    type="text"
                    errors={errors}
                    isReqMsg="Required"
                    disabled={isNew}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol md={12}>
                  <CostumInput
                    register={register}
                    label="SKILL (Tuliskan keahlian & keterampilan yang saat ini anda miliki)"
                    name="skill"
                    type="textarea"
                    errors={errors}
                    isReqMsg="Required"
                    disabled={isNew}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol md={6}>
                  <CostumInput
                      type="select"
                      label="BERSEDIA DITEMPATKAN DI SELURUH KANTOR PERUSAHAAN"
                      controller={Controller}
                      control={control}
                      isClearable={true}
                      name="bersedia_penempatan.value"
                      placeholder={"Ya / Tidak"}
                      handleSelect={handleChangeBersedia}
                      register={register}
                      nameParent="bersedia_penempatan"
                      dataSelect={confirm}
                      isReqMsg="Required"
                      errors={errors}
                      disabled={isNew}
                    />
                </CCol>
                <CCol md={6}>
                  <CostumInput
                    register={register}
                    label="PENGHASILAN YANG DIHARAPKAN (/Bulan)"
                    name="penghasilan_harapan"
                    type="salary"
                    handleChangeSalary={handleChangeSalary}
                    isReqMsg="Required"
                    errors={errors}
                    disabled={isNew}
                  />
                </CCol>
              </CRow>
              {/* pendidikan */}
              <div className="mt-5 d-flex justify-content-between align-items-center">
                <h1>Pendidikan Terakhir</h1>
                {isNew || 
                <ButtonAction
                  type="education"
                  onClick={() => appendPendidikan({})}
                />
                }
              </div>
              {pendidikanFields.map((field, index) => (
                <CRow className="mt-2" key={field.id}>
                  <CCol md={2}>
                    <CostumInput
                      register={register}
                      label="Jenjang Pendidikan"
                      name={`pendidikan[${index}].jenjang_pendidikan`}
                      type="text"
                      disabled={isNew}
                    />
                  </CCol>
                  <CCol md={2}>
                    <CostumInput
                      register={register}
                      label="Institusi"
                      name={`pendidikan[${index}].institusi`}
                      type="text"
                      disabled={isNew}
                    />
                  </CCol>
                  <CCol md={2}>
                    <CostumInput
                      register={register}
                      label="Jurusan"
                      name={`pendidikan[${index}].jurusan`}
                      type="text"
                      disabled={isNew}
                    />
                  </CCol>
                  <CCol md={2}>
                    <CostumInput
                      register={register}
                      label="Tahun Lulus"
                      name={`pendidikan[${index}].tahun_lulus`}
                      type="text"
                      disabled={isNew}
                    />
                  </CCol>
                  <CCol md={2}>
                    <CostumInput
                      register={register}
                      label="IPK"
                      name={`pendidikan[${index}].ipk`}
                      type="text"
                      disabled={isNew}
                    />
                  </CCol>
                  <CCol md={2}>
                    {isNew || 
                    <ButtonAction
                      type="deleteChild"
                      onClick={() => {removePendidikan(index)}}
                    />
                    }
                  </CCol>
                </CRow>
              ))}
              {/* pelatihan */}
              <div className="mt-5 d-flex justify-content-between align-items-center">
                <h1>Riwayat Pelatihan</h1>
                {isNew || 
                <ButtonAction
                  type="certificate"
                  onClick={() => appendPelatihan({})}
                />
                }
              </div>
              {pelatihanFields.map((field, index) => (
                <CRow className="mt-2" key={field.id}>
                  <CCol md={3}>
                    <CostumInput
                      register={register}
                      label="Nama Kursus / Seminar"
                      name={`pelatihan[${index}].nama`}
                      type="text"
                      disabled={isNew}
                    />
                  </CCol>
                  <CCol md={3}>
                    <CostumInput
                      register={register}
                      label="Sertifikat (Ada / Tidak)"
                      name={`pelatihan[${index}].sertifikat`}
                      type="text"
                      disabled={isNew}
                    />
                  </CCol>
                  <CCol md={3}>
                    <CostumInput
                      register={register}
                      label="Tahun"
                      name={`pelatihan[${index}].tahun`}
                      type="text"
                      disabled={isNew}
                    />
                  </CCol>
                  <CCol md={3}>
                    {isNew || 
                    <ButtonAction
                      type="deleteChild"
                      onClick={() => {removePelatihan(index)}}
                    />
                    }
                  </CCol>
                </CRow>
              ))}
              {/* pekerjaan */}
              <div className="mt-5 d-flex justify-content-between align-items-center">
                <h1>Riwayat Pekerjaan</h1>
                {isNew || 
                <ButtonAction
                  type="work"
                  onClick={() => appendPekerjaan({})}
                />
                }
              </div>
              {pekerjaanFields.map((field, index) => (
                <CRow className="mt-2" key={field.id}>
                  <CCol md={3}>
                    <CostumInput
                      register={register}
                      label="Nama Perusahaan"
                      name={`pekerjaan[${index}].perusahaan`}
                      type="text"
                      disabled={isNew}
                    />
                  </CCol>
                  <CCol md={3}>
                    <CostumInput
                      register={register}
                      label="Posisi Terakhir"
                      name={`pekerjaan[${index}].posisi`}
                      type="text"
                      disabled={isNew}
                    />
                  </CCol>
                  <CCol md={2}>
                    <CostumInput
                      register={register}
                      label="Pendapatan Terakhir"
                      name={`pekerjaan[${index}].pendapatan`}
                      type="text"
                      disabled={isNew}
                    />
                  </CCol>
                  <CCol md={2}>
                    <CostumInput
                      register={register}
                      label="Tahun"
                      name={`pekerjaan[${index}].tahun`}
                      type="text"
                      disabled={isNew}
                    />
                  </CCol>
                  <CCol md={2}>
                    {isNew || 
                    <ButtonAction
                      type="deleteChild"
                      onClick={() => {removePekerjaan(index)}}
                    />
                    }
                  </CCol>
                </CRow>
              ))}
            </CForm>
          </CRow>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default Index;

