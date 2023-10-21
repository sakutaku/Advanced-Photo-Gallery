import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Fade } from "react-awesome-reveal";

const Login = () => {
  return (
    <>
      <div className="container login-page">
        <Fade>
          <LoginForm />
        </Fade>
      </div>
    </>
  );
};

export default Login;
