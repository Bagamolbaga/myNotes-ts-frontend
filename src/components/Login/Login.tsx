import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import firebase from "http/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useTitle } from "hooks/useTitle";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { login, authGoogle } from "../../store/asyncActions/asyncUserActions";
import { notifications } from "utils/snowNotifications";

import { Input } from "../../UI/Input/Input";
import { LANGUAGE } from "UI/LANGUAGES";

import googleIcon from "assets/google-color.svg";

import s from "./Login.module.scss";

const MIN_LENGTH = 6;

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { authError, user, lang } = useTypeSelector((state) => state);

  const [loginOrEmail, setLoginOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginIsValid, setLoginIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  useTitle("Login");

  useEffect(() => {
    if (user.isLogin) history.push("/");
  }, [user]);

  useEffect(() => {
    if (loginOrEmail.length !== 0) {
      if (loginOrEmail.length < MIN_LENGTH) setLoginIsValid(false);
      if (loginOrEmail.length >= MIN_LENGTH) setLoginIsValid(true);
    }

    if (loginOrEmail.length === 0) setLoginIsValid(true);
  }, [loginOrEmail]);

  useEffect(() => {
    if (password.length !== 0) {
      if (password.length < MIN_LENGTH) setPasswordIsValid(false);
      if (password.length >= MIN_LENGTH) setPasswordIsValid(true);
    }

    if (password.length === 0) setPasswordIsValid(true);
  }, [password]);

  const loginInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginOrEmail(e.target.value);
  };

  const passwordInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginHandler = () => {
    if (loginOrEmail.length === 0 && password.length === 0) {
      setLoginIsValid(false);
      setPasswordIsValid(false);

      notifications.error("Write all data!");
    }

    if (
      loginIsValid &&
      loginOrEmail.length !== 0 &&
      passwordIsValid &&
      password.length !== 0
    ) {
      dispatch(login(loginOrEmail, password));
    }
  };

  const loginWithGoogleHandler = () => {
    let user = { name: "", email: "", avatar: "" };

    const googleProvider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res: any) => {
        const userInfo = res.additionalUserInfo?.profile as any;
        user = {
          name: userInfo.name,
          email: userInfo.email,
          avatar: userInfo.picture,
        };
        console.log(user);
        dispatch(authGoogle(user.name, user.email, user.avatar));
      })
      .catch((err: any) => console.log(err));
  };

  return (
    <div className={`${s.container}`}>
      <h2 className="authorization__container-title">
        {LANGUAGE[lang].LoginPage.Login}
      </h2>
      <Input
        classNameForContainer={`${s.inputContainer}`}
        value={loginOrEmail}
        type="email"
        isvalid={loginIsValid}
        placeholder={LANGUAGE[lang].LoginPage.LoginPlaceholder}
        onChange={loginInputHandler}
        icon={<FontAwesomeIcon icon="user" />}
      />
      <Input
        classNameForContainer={`${s.inputContainer} mt-1 mb-1`}
        value={password}
        type="password"
        isvalid={passwordIsValid}
        placeholder={LANGUAGE[lang].LoginPage.PasswordPlaceholder}
        onChange={passwordInputHandler}
        icon={<FontAwesomeIcon icon="lock" />}
      />
      <p className="m-0">
        {LANGUAGE[lang].LoginPage.HaveAccount}
        <Link to="/registration">
          <span className={`${s.registrRedirect} ml-1`}>
            {LANGUAGE[lang].LoginPage.RegistrationTitle}
          </span>
        </Link>
      </p>
      <p className="mt-1">
        {LANGUAGE[lang].LoginPage.ForgotPassword}
        <Link to="/reset-password">
          <span className={`${s.registrRedirect} ml-1`}>
            {LANGUAGE[lang].LoginPage.ResetPasswordTitle}
          </span>
        </Link>
      </p>
      <div className={`pt-1 pb-1 ${s.authError}`}>
        <p>{authError}</p>
      </div>
      <button className={`${s.button} mt-1`} onClick={loginHandler}>
        {LANGUAGE[lang].LoginPage.LoginButton}
      </button>
      <div
        className={`${s.button__googleSignIn} mt-1`}
        onClick={loginWithGoogleHandler}
      >
        <div className={s.googleIcon}>
          <img src={googleIcon} alt="" />
        </div>
        <span>Login with Google</span>
      </div>
    </div>
  );
};

export default Login;
