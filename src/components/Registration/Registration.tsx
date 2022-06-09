import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useTitle } from "hooks/useTitle";
import { useTypeSelector } from "hooks/useTypeSelector";
import { registration, authGoogle } from "store/asyncActions/asyncUserActions";
import firebase, { uploadPhoto } from "http/firebase";
import { notifications } from "utils/snowNotifications";

import { Input } from "UI/Input/Input";
import googleIcon from "assets/google-color.svg";

import s from "./Registration.module.scss";

const MIN_LENGTH = 6;

const emailRegExp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

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
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState<IFileUrl>();

  const [nameIsValid, setNameIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [passwordRepeatIsValid, setPasswordRepeatIsValid] = useState(true);

  useTitle("Registration");

  useEffect(() => {
    if (user.isLogin) history.push("/");
  }, [user]);

  useEffect(() => {
    if (name.length !== 0) {
      if (name.length < MIN_LENGTH) setNameIsValid(false);
      if (name.length >= MIN_LENGTH) setNameIsValid(true);
    }

    if (name.length === 0) setNameIsValid(true);
  }, [name]);

  useEffect(() => {
    if (email.length !== 0) {
      if (email.length < MIN_LENGTH) setEmailIsValid(false);
      if (email.length >= MIN_LENGTH) setEmailIsValid(true);

      if (email.match(emailRegExp)) {
        setEmailIsValid(true);
      } else {
        setEmailIsValid(false);
      }
    }

    if (email.length === 0) setEmailIsValid(true);
  }, [email]);

  useEffect(() => {
    if (password.length !== 0) {
      if (password.length < MIN_LENGTH) setPasswordIsValid(false);
      if (password.length >= MIN_LENGTH) setPasswordIsValid(true);
    }

    if (password.length === 0) setPasswordIsValid(true);
  }, [password]);

  useEffect(() => {
    if (password !== passwordRepeat) {
      setPasswordRepeatIsValid(false);
    } else {
      setPasswordRepeatIsValid(true);
    }

    if (passwordRepeat.length === 0) setPasswordRepeatIsValid(true);
  }, [passwordRepeat, password]);

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
    if (name.length === 0 && email.length === 0 && password.length === 0 && passwordRepeat.length === 0) {
      setNameIsValid(false);
      setEmailIsValid(false);
      setPasswordIsValid(false);
      setPasswordRepeatIsValid(false)

      notifications.error("Write all data!");
    }

    if (
      nameIsValid &&
      name.length !== 0 &&
      emailIsValid &&
      email.length !== 0 &&
      passwordIsValid &&
      password.length !== 0 &&
      passwordRepeatIsValid &&
      passwordRepeat.length !== 0
    ) {
      const url = await uploadPhoto(file);
      dispatch(registration(name, email, password, url));
    }
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

  return (
    <Row className={s.container}>
      <h2 className="authorization__container-title">Registration</h2>
      <Input
        classNameForContainer={`${s.inputContainer}`}
        placeholder="Login"
        type="text"
        value={name}
        isvalid={nameIsValid}
        icon={<FontAwesomeIcon icon="user" />}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        classNameForContainer={`${s.inputContainer} mt-1`}
        placeholder="Email"
        type="text"
        value={email}
        isvalid={emailIsValid}
        icon={<FontAwesomeIcon icon="at" />}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        classNameForContainer={`${s.inputContainer} mt-1`}
        placeholder="Password"
        type="password"
        value={password}
        isvalid={passwordIsValid}
        icon={<FontAwesomeIcon icon="lock" />}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        classNameForContainer={`${s.inputContainer} mt-1`}
        placeholder="Password repeat"
        type="password"
        value={passwordRepeat}
        isvalid={passwordRepeatIsValid}
        icon={<FontAwesomeIcon icon="lock" />}
        onChange={(e) => setPasswordRepeat(e.target.value)}
      />
      <Input
        classNameForContainer={`${s.inputContainer} mt-1`}
        placeholder="Avatar"
        type="file"
        icon={<FontAwesomeIcon icon="image" />}
        onChange={fileInputHandler}
      />
      {fileUrl ? (
        <div className={`${s.avatarPreviewContainer}`}>
          <img src={fileUrl.fileUrl.toString()} alt="avatar-preview" />
        </div>
      ) : (
        <p>Please select an Image for Preview</p>
      )}
      <p>
        You have account?
        <Link to="/login">
          <span className={`${s.loginRedirect} ml-1`}>Login</span>
        </Link>
      </p>
      <p className="authorization__container-label-error">
        {authError}
      </p>
      <button
        type="button"
        className={s.button}
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
    </Row>
  );
};

export default Authorization;
