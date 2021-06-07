import { createContext, useContext, useReducer } from "react";

import { initialState, AuthReducer } from "./AuthReducer";

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

export const useAuthStateContext = () => {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthStateContext must be used within an AuthProvider");
  }

  return context;
};

export const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useAuthDispatchContext must be used within an AuthProvider"
    );
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, disptch] = useReducer(AuthReducer, initialState);
  //console.log(user);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={disptch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
