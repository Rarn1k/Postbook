import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/authentication/LoginForm";

function Login() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center">
          <div className="content text-center px-4">
            <h1 className="text-primary">Добро пожаловать в Мюсли</h1>
            <p className="content">
              Войдите и начните делиться своими мюслями! <br />
              Или, если вы еще не зарегистрированы, вот кнопка{" "}
              <Link to="/register/">регистрации</Link>.
            </p>
          </div>
        </div>
        <div className="col-md-6 p-5">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
export default Login;
