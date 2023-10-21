import React from 'react';
import { Fade } from 'react-awesome-reveal';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

const Register = () => {
  return (
    <>
      <div className="container login-page">
        <Fade>
          <RegisterForm/>
        </Fade>
      </div>
    </>
  );
};

export default Register;