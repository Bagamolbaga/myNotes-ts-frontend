import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useTitle } from "hooks/useTitle";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { sendEmailResetPassword } from "../../store/asyncActions/asyncUserActions";
import { notifications } from "utils/snowNotifications";

import { Input } from "../../UI/Input/Input";

import s from "./ResetPassword.module.scss";

const MIN_LENGTH = 6;

const emailRegExp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { authError, user } = useTypeSelector((state) => state);

  const [loginOrEmail, setLoginOrEmail] = useState("");

  const [loginOrEmailIsValid, setLoginOrEmailIsValid] = useState(true);

  useTitle("Reset password");

  useEffect(() => {
    if (user.isLogin) history.push("/");
  }, [user]);

  useEffect(() => {
    if (loginOrEmail.length !== 0) {
      if (loginOrEmail.length < MIN_LENGTH) setLoginOrEmailIsValid(false);
      if (loginOrEmail.length >= MIN_LENGTH) setLoginOrEmailIsValid(true);

      // if (loginOrEmail.match(emailRegExp)) {
      //   (true);
      // } else {
      //   setLoginOrEmailIsValid(false);
      // }
    }

    if (loginOrEmail.length === 0) setLoginOrEmailIsValid(true);
  }, [loginOrEmail]);

  const emailInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginOrEmail(e.target.value);
  };

  const mockHandler = () => {
    notifications.error("Ooops reset not working!");
  };

  // const resetPasswordHandler = () => {
  //   if (loginOrEmail.length === 0) {
  //     setLoginOrEmailIsValid(false)

  //     notifications.error('Write all data!')
  //   }

  //   if (loginOrEmailIsValid && loginOrEmail.length !== 0) {
  //     dispatch(sendEmailResetPassword(loginOrEmail));
  //     console.log(loginOrEmail);
  //   }
  // }

  return (
    <div className={`${s.container}`}>
      <h2 className="authorization__container-title">Reset password</h2>
      <Input
        classNameForContainer={`${s.inputContainer}`}
        value={loginOrEmail}
        isvalid={loginOrEmailIsValid}
        placeholder="Login or Email"
        onChange={emailInputHandler}
        icon={<FontAwesomeIcon icon="user" />}
      />
      <p className="mt-1">
        You have account?
        <Link to="/registration">
          <span className={`${s.registrRedirect} ml-1`}>Registration</span>
        </Link>
      </p>
      <p className="m-0">
        I have account
        <Link to="/login">
          <span className={`${s.registrRedirect} ml-1`}>Login</span>
        </Link>
      </p>
      <div className={`pt-1 pb-1 ${s.authError}`}>
        <p>{authError}</p>
      </div>
      <button type="button" className={s.button} onClick={mockHandler}>
        Reset password
      </button>
    </div>
  );
};

export default ResetPassword;
