import React from "react";
import { Link } from "react-router-dom";
import RegistrationForm from "../components/authentication/RegistrationForm";
function Registration() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center">
          <div className="content text-center px-4">
            <h1 className="text-primary">Добро пожаловать в Мюсли!</h1>
            <p className="content">
              Это новая социальная сеть, которая позволит вам делиться вашими
              мыслями и новостями с вашими друзьясм. Зарегистрируйтесь сейчас 
              и начните пользоваться! <br />
              Или, если вы уже имеете акаунт, вы можете{" "}
              <Link to="/login/">войти</Link>.
            </p>
          </div>
        </div>
        <div className="col-md-6 p-5">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}

export default Registration;
