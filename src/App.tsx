import React, { useEffect, useState } from "react";
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
import Note from "./components/Note/Note";
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
			<NoteList />
			<Note />
		</div>
  );
}

export default App;
