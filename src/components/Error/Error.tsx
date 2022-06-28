import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useTypeSelector } from "hooks/useTypeSelector";
import { notifications } from "utils/snowNotifications";

import s from "./Error.module.scss";

const Error = ({ error, resetErrorBoundary} : any) => {
  const { selectNoteId, notes } = useTypeSelector((state) => state);
  const history = useHistory();

  const redirectToHome = () => history.push("/");

  useEffect(() => {
    notifications.closeAll();
    notifications.error("Note not found. Open another note!");
  }, []);

  useEffect(() => {
    const selectNote = notes.find((note) => note.id === selectNoteId);
    if (selectNote) {
      resetErrorBoundary()
      history.push(`/note/${selectNote.uuid}`);
    }
  }, [selectNoteId]);

  return (
    <div className={s.container}>
      <h2>Ooops!</h2>
      <h3>Something went wrong</h3>
      <div className={s.btn} onClick={redirectToHome}>
        <div className={s.iconContainer}>
          <FontAwesomeIcon icon="house" />
        </div>
        <p className={s.tabTitle}>Home</p>
      </div>
    </div>
  );
};

export default Error;
