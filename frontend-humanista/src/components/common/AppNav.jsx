import React from "react";

import { NavLink as RouterLink } from "react-router-dom";

import { Navbar, Nav, NavbarBrand, NavItem, NavLink } from "reactstrap";

import Sidebar from "../common/Sidebar";

import {
  useAuthStateContext,
  useAuthDispatch,
} from "../../context/auth/AuthContext";
import AuthService from "../../services/auth/AuthService";

const AppNav = () => {
  let user = useAuthStateContext();
  let { roles } = useAuthStateContext();
  const dispatch = useAuthDispatch();

  const Logout = async () => {
    await AuthService.logOutUser(dispatch);
  };

  return (
    <>
      <Navbar className="row accent-color">
        <Nav className="col-12 d-flex align-items-center justify-content-between ">
          <NavItem className="col-3 text-center ">
            <Sidebar />
          </NavItem>
          <NavbarBrand className="col-3 text-center " href="/">
            <NavLink tag={RouterLink} to="/home">
              HUMANISTA
            </NavLink>
          </NavbarBrand>
          <div className="col-3 text-center ">
            {roles.includes("ROLE_ADMIN") ? (
              <>
                <NavItem>
                  <NavLink tag={RouterLink} to="/admin">
                    SETTINGS
                  </NavLink>
                </NavItem>
                {user.token === "" ? (
                  <NavItem>
                    <RouterLink tag={RouterLink} to="/login">
                      LOGIN
                    </RouterLink>
                  </NavItem>
                ) : (
                  <NavItem>
                    <RouterLink onClick={Logout} to="/home">
                      LOGOUT
                    </RouterLink>
                  </NavItem>
                )}
              </>
            ) : null}
          </div>
        </Nav>
      </Navbar>
    </>
  );
};

export default AppNav;
