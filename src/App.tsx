import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Switch, Route, useHistory } from "react-router";
import { useTypeSelector } from "./hooks/useTypeSelector";
import { authCheck } from "./store/asyncActions/asyncUserActions";
import { getAsyncGroup } from "./store/asyncActions/asyncGroupActions";
import { getAsyncNotes } from "./store/asyncActions/asyncNoteActions";
import { useDispatch } from "react-redux";
import { socketRef } from "./http/socket-io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import s from "./App.module.scss";
import NoteWrapper from "./components/Note/NodeWrapper";
import EditNodeWrapper from "./components/EditNote/EditNoteWrapper";
import SideBarWrapper from "./components/SideBar/SideBarWrapper";
import NoteList from "./components/NoteList/NoteList";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import CreateNote from "./components/CreateNote/CreateNote";

// const toastId = toast.loading("Loading data...");

function App() {
  const { user } = useTypeSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const reloadCount = useRef(0);

  useLayoutEffect(() => {
    dispatch(authCheck());
    // reloadCount.current++;
  }, []);

  useEffect(() => {
    console.log("effect", user);
    console.log(reloadCount);

    // reloadCount.current++;
    if (user.isLogin) {
      const toastId = toast.loading("Loading data...");

      dispatch(getAsyncGroup());
      dispatch(getAsyncNotes());

      toast.update(toastId, {
        render: "Data loaded!",
        position: "bottom-center",
        type: "success",
        autoClose: 2000,
        isLoading: false
      });

      socketRef.emit("joinRoom", user.id!.toString());
    }
    
    if (reloadCount.current === 1 && !user.isLogin) {
      history.push("/login");
    }

    // if (reloadCount.current === 3) {
    //   history.goBack();
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isLogin]);
  console.log(user.isLogin, reloadCount.current);

  useEffect(() => {
    reloadCount.current += 1;
  }, []);

  return (
    <div className={s.container}>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <SideBarWrapper />
      <NoteList />
      <Switch>
        <Route exact path="/create-note">
          <CreateNote />
        </Route>
        <Route exact path="/note/:noteId">
          <NoteWrapper />
        </Route>
        <Route exact path="/edit-note/:noteId">
          <EditNodeWrapper />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/registration">
          <Registration />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
