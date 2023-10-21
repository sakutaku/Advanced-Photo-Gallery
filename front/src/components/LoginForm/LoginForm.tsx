import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BtnSpinner from "../Spinner/BtnSpinner";
import { useAppDispatch } from "../../app/hook";
import { selectLoginError, selectLoginLoading } from "../../store/usersSlice";
import { fetchGoogleLogin, loginUser } from "../../store/usersThunk";
import { LoginMutation } from "../../type";
import { GoogleLogin } from "@react-oauth/google";

const LoginForm = () => {
  const loginLoading = useSelector(selectLoginLoading);
  const [state, setState] = useState<LoginMutation>({
    username: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const error = useSelector(selectLoginError);
  const navigate = useNavigate();

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(loginUser(state)).unwrap();
      navigate("/");
    } catch (e) {
      alert("Something is wrong!");
    } finally {
      setState(() => ({
        username: "",
        password: "",
      }));
    }
  };

  const googleLoginHandler = async (credential: string) => {
    try {
      await dispatch(fetchGoogleLogin(credential)).unwrap();
      navigate("/");
    } catch (e) {
      alert("Something is wrong!");
    }
  };

  return (
    <form className="form" onSubmit={submitFormHandler}>
      <h2 className="form-title">Login</h2>
      <div className="input-wrap google-wrap">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              void googleLoginHandler(credentialResponse.credential);
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
      <div>
        <div className="input-wrap">
          <label htmlFor="username" className="form-label">
            Your name:
          </label>
          {error ? <span className="error">{error.error}</span> : null}
          <input
            type="text"
            className={error ? "form-control-error" : "form-control"}
            name="username"
            id="username"
            value={state.username}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="input-wrap">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          {error ? <span className="error">{error.error}</span> : null}
          <input
            type="password"
            className={error ? "form-control-error" : "form-control"}
            name="password"
            id="password"
            value={state.password}
            onChange={inputChangeHandler}
          />
        </div>
        <div className=" btn-wrap">
          <button type="submit" className="form-btn" disabled={loginLoading}>
            {loginLoading && <BtnSpinner />}
            Log in
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
