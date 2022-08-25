import React, { useEffect, useRef } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion/dist/framer-motion";

import { socketRef } from "./http/socket-io";
import { useTypeSelector } from "./hooks/useTypeSelector";
import { useIsMobile } from "hooks/useIsMobile";

import { getBrowserLanguage } from 'utils/getBrowserLanguage'

import { setLanguage } from './store/actions/otherActions'
import { authCheck } from "./store/asyncActions/asyncUserActions";
import { getAsyncGroup } from "./store/asyncActions/asyncGroupActions";
import { getAsyncNotes } from "./store/asyncActions/asyncNoteActions";

import NoteWrapper from "./components/Note/NodeWrapper";
import EditNodeWrapper from "./components/EditNote/EditNoteWrapper";
import SideBarWrapper from "./components/SideBar/SideBarWrapper";
import NoteList from "./components/NoteList/NoteList";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import ResetPassword from "components/ResetPassword/ResetPassword";
import ResetPasswordToken from "components/ResetPassword/ResetPasswordToken";
import CreateNote from "./components/CreateNote/CreateNote";
import MainWrapper from "components/Main/MainWrapper";

import MobileSideBar from "components/Mobile/MobileSideBar";
import MobileNoteList from "components/Mobile/MobileNoteList";
import MobileMain from "components/Mobile/MobileMain";
import MobileNoteWrapper from "components/Mobile/MobileNote/MobileNodeWrapper";
import MobileEditNoteWrapper from "components/Mobile/MobileEditNote/MobileEditNoteWrapper";
import MobileCreateNote from "components/Mobile/MobileCreateNote/MobileCreateNote";
import MobileLogin from "components/Mobile/MobileLogin/MobileLogin";
import MobileRegistration from "components/Mobile/MobileRegistration/MobileRegistration";
import MobileOptionsMenuWrapper from "components/Mobile/MobileOptionsMenu/MobileOptionsMenuWrapper";

import "react-toastify/dist/ReactToastify.css";
import s from "./App.module.scss";


function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useTypeSelector((state) => state);
  const { isMobile } = useIsMobile();

  const reloadCount = useRef(0);

  useEffect(() => {
    dispatch(authCheck());
    dispatch(setLanguage(getBrowserLanguage()));
  }, []);

  useEffect(() => {
    if (user.isLogin) {
      const toastId = toast.loading("Loading data...");

      dispatch(getAsyncGroup());
      dispatch(getAsyncNotes());

      toast.update(toastId, {
        render: "Data loaded!",
        position: "bottom-center",
        type: "success",
        autoClose: 2000,
        isLoading: false,
      });

      socketRef.emit("joinRoom", user.id!.toString());
    }

    if (!user.isLogin && reloadCount.current > 0) {
      history.push("/login");
    }
  }, [user]);

  useEffect(() => {
    reloadCount.current += 1;
  }, []);

  return (
    <>
      <div className={s.container}>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme="dark"
        />
        {!isMobile() && (
          <>
            {user.isLogin && <SideBarWrapper />}
            <Switch>
              <Route exact path="/">
                <MainWrapper />
              </Route>
              <Route exact path="/create-note">
                <NoteList />
                <AnimatePresence>
                  <CreateNote />
                </AnimatePresence>
              </Route>
              <Route exact path="/note/:noteId">
                <NoteList />
                <AnimatePresence>
                  <NoteWrapper />
                </AnimatePresence>
              </Route>
              <Route exact path="/edit-note/:noteId">
                <NoteList />
                <AnimatePresence>
                  <EditNodeWrapper />
                </AnimatePresence>
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/registration">
                <Registration />
              </Route>
              <Route exact path="/reset-password">
                <ResetPassword />
              </Route>
              <Route exact path="/reset-password/:tokenId">
                <ResetPasswordToken />
              </Route>
              <Route exact>
                <MainWrapper />
              </Route>
            </Switch>
          </>
        )}
      </div>
      {isMobile() && (
        <>
          <MobileSideBar />
          <Route exact path="/">
            <MobileMain />
          </Route>
          <Route exact path="/menu">
            <MobileOptionsMenuWrapper />
          </Route>
          <Route exact path="/list">
            <MobileNoteList />
          </Route>
          <Route exact path="/note/:noteId">
            <MobileNoteWrapper />
          </Route>
          <Route exact path="/edit-note/:noteId">
            <MobileEditNoteWrapper />
          </Route>
          <Route exact path="/create-note">
            <MobileCreateNote />
          </Route>
          <Route exact path="/login">
            <MobileLogin />
          </Route>
          <Route exact path="/registration">
            <MobileRegistration />
          </Route>
          <Route exact path="/reset-password">
            <ResetPassword />
          </Route>
          <Route exact path="/reset-password/:tokenId">
            <ResetPasswordToken />
          </Route>
        </>
      )}
    </>
  );
}

export default App;
