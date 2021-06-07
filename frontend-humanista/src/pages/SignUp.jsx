import React, { useState } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import AuthService from "../services/auth/AuthService";

const SignUp = (props) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
  });

  const signupInput = (e) => {
    setCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitSignup = async (e) => {
    e.preventDefault();

    let payload = {
      email: userCredentials.email,
      username: userCredentials.username,
      password: userCredentials.password,
    };

    try {
      let response = await AuthService.signupUser(payload);
      if (response.status === 200) {
        console.log(response.data);
        return props.history.push("home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="customContainer d-flex align-items-center justify-content-center mt-5">
      <div className="row shadow-lg p-3 mb-5 bg-body rounded mt-5">
        <h1 className="col-12">Signup</h1>
        <div className="col-12 d-flex align-items-center justify-content-center">
          <Form className="col-8" onSubmit={onSubmitSignup}>
            <FormGroup>
              <Input
                className="bg-color"
                placeholder="Email"
                type="email"
                name="email"
                value={userCredentials.email}
                onChange={signupInput}
              />
            </FormGroup>
            <FormGroup>
              <Input
                className="bg-color"
                placeholder="Username"
                type="text"
                name="username"
                value={userCredentials.username}
                onChange={signupInput}
              />
            </FormGroup>
            <FormGroup>
              <Input
                className="bg-color"
                placeholder="Password"
                type="password"
                name="password"
                value={userCredentials.password}
                onChange={signupInput}
              />
            </FormGroup>
            <FormGroup className="text-center">
              <Button>Sign Up</Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
