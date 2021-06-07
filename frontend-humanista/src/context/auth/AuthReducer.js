let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : "";

let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).accessToken
  : "";

export const initialState = {
  user: "" || user,
  token: "" || token,
  email: "",
  roles: [],
  loading: false,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN": {
      return {
        ...initialState,
        loading: true,
      };
    }

    case "LOGIN_SUCCESS": {
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.accessToken,
        email: action.payload.email,
        roles: action.payload.roles,
        loading: false,
      };
    }

    case "LOGOUT": {
      return {
        ...initialState,
        user: "",
        token: "",
      };
    }

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
