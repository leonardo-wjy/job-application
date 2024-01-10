import Swal from "sweetalert";

import { removeUser } from "src/redux/userSlice";

const ResponseError = (err, dispatch, history) => {
  if (err.response) {
    if (err.response.status === 401) {
      dispatch(removeUser());
      Swal("Session Expired", "", "warning");
      history.push("/");
    } else {
      Swal(err.response?.data?.message, "", "error");
    }
  } else if (err.request) {
    // The request was made but no response was received
    Swal("Error Occured. Please Try Again Later!", "", "error");
    // setLoading(false);
  } else {
    // Something happened in setting up the request that triggered an Error
    Swal("Error Occured. Please Try Again Later!", "", "error");
    // setLoading(false);
  }
};

export default ResponseError;
