import React, { FC, useState } from "react";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { useParams } from "react-router-dom";
import { IGroup, INote } from "../../types/state";
import { OutputData } from "@editorjs/editorjs";
import Editor from "../Editor";
import GroupItem from "../SideBar/GroupItem/GroupItem";
import s from "./Note.module.scss";

interface IParams {
  noteId: string;
}

const Note: FC = () => {
  const { noteId } = useParams<IParams>();
  const { notes, groups } = useTypeSelector((state) => state);
  console.log('render note ', noteId)

  const note = notes.filter((item) => item.id === Number(noteId))[0];
  const group = groups.find((group) => group.id === note.group_id);

  const dataText = JSON.parse(note.text) as OutputData;

  const [showOptions, setShowOptions] = useState(false);
  const [showChangeModal, setShowChangeModal] = useState(false);

  const closeModalHandler = (e: React.MouseEvent) => {
    showOptions && setShowOptions(false);
  };

  const toggleModalHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };

  const closeChangeGroupModalHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    showChangeModal && setShowChangeModal(false);
  };

  const openChangeGroupModalHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    showOptions && setShowOptions(false);
    !showChangeModal && setShowChangeModal(true);
  };

  const stopPropagationEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className={s.container} onClick={closeModalHandler}>
        {showOptions && (
          <div
            className={s.optionsModalContainer}
            onClick={stopPropagationEvent}
          >
            <div className={s.optionsItemContainer}>
              <div className={s.iconContainer}>
                <i className="far fa-heart"></i>
              </div>
              <p>Add to favorites</p>
            </div>
            <div className={s.optionsItemContainer}>
              <div className={s.iconContainer}>
                <i className="fas fa-thumbtack"></i>
              </div>
              <p>Pin note</p>
            </div>
            <div className={s.optionsItemContainer}>
              <div className={s.iconContainer}>
                <i className="far fa-edit"></i>
              </div>
              <p>Edit note</p>
            </div>
            <div className={s.optionsItemContainer}>
              <div className={s.iconContainer}>
                <i className="far fa-copy"></i>
              </div>
              <p>Copy note</p>
            </div>
            <div
              className={s.optionsItemContainer}
              onClick={openChangeGroupModalHandler}
            >
              <div className={s.iconContainer}>
                <i className="far fa-folder"></i>
              </div>
              <p>Change group</p>
            </div>
            <div className={s.optionsItemContainer}>
              <div className={s.iconContainer}>
                <i className="far fa-trash-alt"></i>
              </div>
              <p>Delete note</p>
            </div>
          </div>
        )}
        <div className={s.headerContainer}>
          <div className={s.selectAndInputTagsContainer}>
            <div className={s.selectGroup}>
              <i className="far fa-folder" style={{ color: "red" }}></i>
              <p className="groupLabel">{group?.title}</p>
              <i className={`fas fa-sort-down ${s.arrow}`}></i>
            </div>
            <div className={s.inputTagsContainer}>
              <i className="fas fa-hashtag"></i>
              <input placeholder="Add tags" type="text" name="tags" id="" />
            </div>
          </div>
          <div className={s.optionsContainer} onClick={toggleModalHandler}>
            <div className={s.options}>
              <i className="fas fa-ellipsis-h"></i>
            </div>
          </div>
        </div>
        <div className={s.noteContainer}>
          <div className={s.noteHeader}>
            <img
              src="https://i.pinimg.com/originals/c5/57/04/c55704fa7c9795fc439cb47246d30e27.jpg"
              alt=""
            />
            <div className={s.noteHeaderInfo}>
              <div className={s.groupCircle}></div>
              <h1 className={s.noteTitle}>{note.title}</h1>
            </div>
          </div>
          <Editor key={note.id} readOnly={false} id={note.id} value={dataText} />
        </div>
      </div>
    </>
  );
};

export default Note;
