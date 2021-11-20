import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router";
import { Container } from "react-bootstrap";
// import SideBar from "./components/SideBar";
import MainContentWraper from "./components/MainContentWraper";
import { useTypeSelector } from "./hooks/useTypeSelector";
import { authCheck } from "./store/asyncActions/asyncUserActions";
import { getAsyncGroup } from "./store/asyncActions/asyncGroupActions";
import { getAsyncNotes } from "./store/asyncActions/asyncNoteActions";
import { useDispatch } from "react-redux";
import { socketRef } from "./http/socket-io";

import s from "./App.module.scss";
import NoteList from "./components/NoteList/NoteList";
import NoteWrapper from "./components/Note/NodeWrapper";
import SideBar from "./components/SideBar/SideBar";

function App() {
  const { user } = useTypeSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheck());
  }, []);

  useEffect(() => {
    if (user.isLogin) {
      dispatch(getAsyncGroup());
      dispatch(getAsyncNotes());

      socketRef.emit("joinRoom", user.id!.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isLogin]);

  return (
    <div className={s.container}>
      <SideBar />
      <Switch>
        <Route path="/">
          <NoteList />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/note/:noteId">
          <NoteWrapper />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
