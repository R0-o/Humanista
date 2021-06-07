import React, { useState } from "react";

import { Button, Form, FormGroup, Input } from "reactstrap";

import AuthService from "../services/auth/AuthService";

import { useAuthDispatch } from "../context/auth/AuthContext";

const Login = (props) => {
  const dispatch = useAuthDispatch();

  const [errorMessage, setErrorMessage] = useState("");

  const [userCredentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const loginInput = (e) => {
    setCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();

    let payload = {
      username: userCredentials.username,
      password: userCredentials.password,
    };

    try {
      //response from the AuthService
      let response = await AuthService.loginUser(dispatch, payload);
      if (response.status === 200) {
        return props.history.push("home");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Login failed");
    }
  };

  return (
    <>
      <div className="customContainer">
        <div className="d-flex align-items-center justify-content-center mt-5">
          <div className="row">
            {errorMessage ? (
              <div className="col-12 shadow-lg p-3 bg-body rounded mt-5 error-color text-center">
                {errorMessage}
              </div>
            ) : null}

            <div className="col-12 shadow-lg p-3 mb-5 bg-body rounded ">
              <h1 className="col-12">Login</h1>
              <div className="col-12 d-flex align-items-center justify-content-center">
                <Form className="col-12" onSubmit={onSubmitLogin}>
                  <FormGroup>
                    <Input
                      className="bg-color"
                      placeholder="Username"
                      type="text"
                      value={userCredentials.username}
                      name="username"
                      onChange={loginInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      className="bg-color"
                      placeholder="Password"
                      type="password"
                      id="password"
                      value={userCredentials.password}
                      name="password"
                      onChange={loginInput}
                    />
                  </FormGroup>
                  <FormGroup className="text-center">
                    <Button className="accent-color">Login</Button>
                  </FormGroup>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
