import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useTitle } from "hooks/useTitle";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { resetPassword } from "../../store/asyncActions/asyncUserActions";
import { notifications } from "utils/snowNotifications";

import { Input } from "../../UI/Input/Input";

import s from "./ResetPassword.module.scss";

const MIN_LENGTH = 6;

interface IParams {
  tokenId: string
}

const ResetPasswordToken = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { tokenId } = useParams<IParams>()
  const { authError, user } = useTypeSelector((state) => state);

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");

  const [newPasswordIsValid, setNewPasswordIsValid] = useState(true);
  const [newPasswordRepeatIsValid, setNewPasswordRepeatIsValid] = useState(true);

  useTitle('Write new password')

  useEffect(() => {
    if (user.isLogin) history.push("/");
  }, [user]);

  useEffect(() => {
    if (newPassword.length !== 0) {
      if (newPassword.length < MIN_LENGTH) setNewPasswordIsValid(false);
      if (newPassword.length >= MIN_LENGTH) setNewPasswordIsValid(true);
    }

    if (newPassword.length === 0) setNewPasswordIsValid(true);


  }, [newPassword]);

  useEffect(() => {
    if (newPasswordRepeat.length !== 0) {
      if (newPasswordRepeat !== newPassword) {
        setNewPasswordRepeatIsValid(false);
      } else {
        setNewPasswordRepeatIsValid(true);
      }
    }

    if (newPasswordRepeat.length === 0) setNewPasswordRepeatIsValid(true);


  }, [newPasswordRepeat]);

  const newPasswordInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const newPasswordRepeatInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPasswordRepeat(e.target.value);
  };

  const mockHandler = () => {
    notifications.error("Ooops reset not working!");
  };

  // const resetPasswordHandler = () => {
  //   if (newPassword.length === 0 || newPasswordRepeat.length === 0) {
  //     if (newPassword.length === 0) {
  //       setNewPasswordIsValid(false)
  //     }

  //     if (newPasswordRepeat.length === 0) {
  //       setNewPasswordRepeatIsValid(false)
  //     }
      
  //     notifications.error('Write all data!')
  //   }

  //   if (newPasswordIsValid && newPassword.length !== 0) {
  //     dispatch(resetPassword( tokenId, newPassword));
  //     console.log(tokenId);
  //   }
  // } 


  return (
    <div className={`${s.container}`}>
      <h2 className="authorization__container-title">Write new password</h2>
      <Input
        classNameForContainer={`${s.inputContainer}`}
        value={newPassword}
        isvalid={newPasswordIsValid}
        placeholder="New password"
        onChange={newPasswordInputHandler}
        icon={<FontAwesomeIcon icon="user" />}
      />
      <Input
        classNameForContainer={`${s.inputContainer} mt-1 mb-1`}
        value={newPasswordRepeat}
        isvalid={newPasswordRepeatIsValid}
        placeholder="New password repeat"
        onChange={newPasswordRepeatInputHandler}
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
      <button
        type="button"
        className={s.button}
        onClick={mockHandler}
      >
        Reset password
      </button>
    </div>
  );
};

export default ResetPasswordToken;
