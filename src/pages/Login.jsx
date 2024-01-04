import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import useLogin from "./../hooks/useLogin";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";

function LoginPage({ addUserInState }) {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [alertMessage, setAlertMessage] = useState({
    status: false,
    message: "",
    type: "",
  });
  //APIs//

  const {
    mutate: loginApiFn,
    isPending: loginApiLoading,
    isSuccess: loginApiSuccess,
    isError: loginApiError,
    error: loginApiErrorMessage,
    data: loginApiData,
  } = useLogin();

  useEffect(() => {
    if (loginApiError) {
      setAlertMessage({
        status: true,
        message: loginApiErrorMessage.message,
        type: "error",
      });
    }
  }, [loginApiError]);

  useEffect(() => {
    if (loginApiSuccess) {
      setAlertMessage({
        status: true,
        message: "Successfully Loggedin",
        type: "success",
      });
      addUserInState(loginApiData);
      navigate("/");
    }
  }, [loginApiSuccess]);

  const handleLogin = (itemValue, itemName) => {
    setLoginForm({
      ...loginForm,
      [itemName]: itemValue,
    });
  };

  const loginAPI = () => {
    setAlertMessage({
      status: false,
      message: "",
      type: "",
    });
    if (!loginForm["email"] || !loginForm["password"]) {
      setAlertMessage({
        status: true,
        message: "please provide all values",
        type: "error",
      });
      return;
    }

    const payload = {
      username: loginForm["email"],
      password: loginForm["password"],
    };

    loginApiFn(payload);
  };

  return (
    <div className="login-container">
      <div className="login-container-center wrapper page flex justify-center items-center flex-col">
        <div className="title-container">
          <h1 className="custom-title">Login Page</h1>
          <div className="custom-underline "></div>
        </div>
        {alertMessage.status && (
          <Alert message={alertMessage.message} type={alertMessage.type} />
        )}

        <div className="login-form w-full flex flex-col gap-4 mt-6">
          <div className="input-container">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="custom-input"
              value={loginForm["email"]}
              onChange={(e) => handleLogin(e.target.value, "email")}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Enter Your Password - "
              className="custom-input"
              value={loginForm["password"]}
              onChange={(e) => handleLogin(e.target.value, "password")}
            />
          </div>
          {/* <div className="btn-container">
          <button className="custom-button" onClick={loginAPI}>
            Login
          </button>
        </div> */}
          <div>
            <Button
              title={"LOGIN"}
              handleClick={loginAPI}
              isLoading={loginApiLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
