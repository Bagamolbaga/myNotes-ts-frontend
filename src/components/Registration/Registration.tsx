import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Row } from "react-bootstrap";
import { Input } from "../../UI/Input/Input";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { registration, authGoogle } from "../../store/asyncActions/asyncUserActions";
import { uploadPhoto } from "../../http/firebase";
import firebase from "http/firebase";

import googleIcon from "assets/google-color.svg";

import s from "./Registration.module.scss";
import { useTitle } from "hooks/useTitle";

interface AuthorizationProps {
  isReg?: boolean;
}

interface IFileUrl {
  fileUrl: string | ArrayBuffer;
}

const Authorization: React.FC<AuthorizationProps> = ({ isReg }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { authError, user } = useTypeSelector((state) => state);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState<IFileUrl>();

  const [validError, setValidError] = useState("");

  useTitle('Registration')

  useEffect(() => {
    user.isLogin && history.push("/");
  }, [history, user.isLogin]);

  const fileInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f: any = e.target.files !== null && e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFile(f);
      reader.result !== null && setFileUrl({ fileUrl: reader.result });
    };
    reader.readAsDataURL(f);
  };

  const registrHandler = async () => {
    const url = await uploadPhoto(file);
    dispatch(registration(name, email, password, url));
  };

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

  useEffect(() => {
    name.length < 6 && setValidError("Nickname min length 5");
    !email.includes("@") && setValidError("Not valid Email");
    password.length < 6 && setValidError("Password min length 5");
    password.length >= 6 &&
      name.length >= 6 &&
      email.includes("@") &&
      setValidError("");
  }, [name, email, password]);

  return (
    <Row className={s.container}>
      <h2 className="authorization__container-title">Authorization</h2>
      <label className="authorization__container-label" htmlFor="login">
        Login
      </label>
      <Input
        className={`${s.input} mt-1`}
        placeholder="Login"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label className="authorization__container-label" htmlFor="login">
        Email
      </label>
      <Input
        className={`${s.input} mt-1`}
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="authorization__container-label" htmlFor="password">
        Password
      </label>
      <Input
        className={`${s.input} mt-1`}
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label className="authorization__container-label" htmlFor="password">
        Avatar
      </label>
      <Input
        className={`${s.input} mt-1`}
        placeholder="Avatar"
        type="file"
        onChange={fileInputHandler}
      />
      {fileUrl ? (
        <div className={`${s.avatarPreviewContainer}`}>
          <img src={fileUrl.fileUrl.toString()} alt="avatar-preview" />
        </div>
      ) : (
        <p>Please select an Image for Preview</p>
      )}
      <p className="authorization__container-label-error">
        {authError}
        {validError}
      </p>
      <button
        type="button"
        className={s.button}
        disabled={Boolean(validError)}
        onClick={registrHandler}
      >
        Registration
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
      <p>
        You have account?
        <Link to="/login">
          <span className={`${s.loginRedirect} ml-1`}>Login</span>
        </Link>
      </p>
    </Row>
  );
};

export default Authorization;
