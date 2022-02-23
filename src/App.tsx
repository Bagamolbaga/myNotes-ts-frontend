import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Switch, Route, useHistory } from "react-router";
import { useTypeSelector } from "./hooks/useTypeSelector";
import { authCheck } from "./store/asyncActions/asyncUserActions";
import { getAsyncGroup } from "./store/asyncActions/asyncGroupActions";
import { getAsyncNotes } from "./store/asyncActions/asyncNoteActions";
import { useDispatch } from "react-redux";
import { socketRef } from "./http/socket-io";

import s from "./App.module.scss";
import NoteWrapper from "./components/Note/NodeWrapper";
import EditNodeWrapper from "./components/EditNote/EditNoteWrapper";
import SideBarWrapper from './components/SideBar/SideBarWrapper'
import NoteList from "./components/NoteList/NoteList";
import Login from './components/Login/Login'
import Registration from './components/Registration/Registration'
import CreateNote from './components/CreateNote/CreateNote'

function App() {
  const { user } = useTypeSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const reloadCount = useRef(0)

  useLayoutEffect(() => {
    dispatch(authCheck());
    reloadCount.current++
  }, []);

  useEffect(() => {
    reloadCount.current++
    if (user.isLogin) {
      dispatch(getAsyncGroup());
      dispatch(getAsyncNotes());
      
      socketRef.emit("joinRoom", user.id!.toString());
    } else if (!user.isLogin){
      history.push('/login')
    }

    if (reloadCount.current === 3){
      history.goBack()
      console.log('sdfs');
    }

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isLogin]);
// console.log(user.isLogin, reloadCount.current);

  return (
    <div className={s.container}>
      <SideBarWrapper />
      <Switch>
        <Route path="/">
          <NoteList />
        </Route>
      </Switch>
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
