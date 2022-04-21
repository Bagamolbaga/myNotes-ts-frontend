import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { login, authGoogle } from "../../store/asyncActions/asyncUserActions";
import { Input } from "../../UI/Input/Input";
import googleIcon from "assets/google-color.svg";
import s from "./Login.module.scss";

import firebase from "http/firebase";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { authError, user } = useTypeSelector((state) => state);
  const [loginOrEmail, setLoginOrEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user.isLogin) history.push("/");
  }, [user]);

  const loginInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginOrEmail(e.target.value);
  };

  const passwordInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginHandler = () => dispatch(login(loginOrEmail, password));

  const loginWithGoogleHandler = () => {
    let user = { name: "", email: "", avatar: "" };

    const googleProvider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const userInfo = res.additionalUserInfo?.profile as any;
        user = {
          name: userInfo.name,
          email: userInfo.email,
          avatar: userInfo.picture,
        };
        console.log(user);
        dispatch(authGoogle(user.name, user.email, user.avatar));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={`${s.container}`}>
      <h2 className="authorization__container-title">Login</h2>
      <Input
        className={s.input}
        value={loginOrEmail}
        placeholder="Login or Email"
        onChange={loginInputHandler}
        icon={<i className="fas fa-search"></i>}
      />
      <Input
        className={`${s.input} mt-1`}
        value={password}
        placeholder="Password"
        onChange={passwordInputHandler}
        icon={<i className="fas fa-search"></i>}
      />
      <p className="m-0">
        You have account?
        <Link to="/registration">
          <span className={`${s.registrRedirect} ml-1`}>Registration</span>
        </Link>
      </p>
      <div className="pt-1 pb-1">
        <p>{authError}</p>
      </div>
      <button className={`${s.button} mt-1`} onClick={loginHandler}>
        Login
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
