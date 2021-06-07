import axiosURL from "../http.common";

const loginUser = async (dispatch, payload) => {
  try {
    dispatch({ type: "REQUEST_LOGIN" });

    const res = await axiosURL.post("auth/login", payload);

    if (res.status === 200) {
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      return res;
    }
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
    console.log(error);
  }
};

const signupUser = (payload) => {
  return axiosURL.post("auth/signup", payload);
};

const logOutUser = async (dispatch) => {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");

}

export default {
  loginUser,
  logOutUser,
  signupUser,
};
