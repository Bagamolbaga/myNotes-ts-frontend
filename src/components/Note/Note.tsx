import React, { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { selectNote } from "../../store/actions/noteActions";
import {
  createAsyncNote,
  fixedNote,
  unFixedNote,
  asyncDeleteNote,
} from "../../store/asyncActions/asyncNoteActions";
import { OutputData } from "@editorjs/editorjs";
import Editor from "../Editor";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-regular-svg-icons'
import s from "./Note.module.scss";

interface IParams {
  noteId: string;
}

const Note: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { noteId } = useParams<IParams>();
  const { notes, groups, selectNoteId } = useTypeSelector((state) => state);

  useEffect(() => {
    if (noteId && typeof selectNoteId === "boolean") {
      dispatch(selectNote(Number(noteId)));
    }
  }, []);

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

  const pinnedNoteHandler = () => {
    const fixedNotesLength = notes.filter((note) => note.fixed).length;

    if (!note?.fixed && fixedNotesLength < 4) {
      dispatch(fixedNote(selectNoteId as number));
    }

    if (note?.fixed) {
      dispatch(unFixedNote(selectNoteId as number));
    }
  };

  const copyNoteHandler = () => {
    dispatch(
      createAsyncNote({
        headerImg: note!.headerImg,
        title: note!.title,
        text: note!.text,
        tags: note!.tags,
        groupId: note!.group_id,
      })
    );
  };

  const deleteNoteHandler = () => {
    dispatch(asyncDeleteNote(selectNoteId as number));
    history.push('/')
  };

  return (
    <>
      {showChangeModal && (
        <div
          className={s.changeGroupModalContainer}
          onClick={closeChangeGroupModalHandler}
        >
          <div className={s.changeGroupModal} onClick={stopPropagationEvent}>
            <p>Select new group</p>
            {/* <GroupItem
              onClick={() => null}
              isSelected={false}
              showSideBar={false}
              color="#d83030"
              label="Game"
            /> */}
          </div>
        </div>
      )}
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
            <div className={s.optionsItemContainer} onClick={pinnedNoteHandler}>
              <div className={s.iconContainer}>
                <i className="fas fa-thumbtack"></i>
              </div>
              <p>{note?.fixed ? "Unpin note" : "Pin note"}</p>
            </div>
            <Link to={`/edit-note/${note.id}`}>
              <div className={s.optionsItemContainer}>
                <div className={s.iconContainer}>
                  <i className="far fa-edit"></i>
                </div>
                <p>Edit note</p>
              </div>
            </Link>
            <div className={s.optionsItemContainer} onClick={copyNoteHandler}>
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
            <div className={s.optionsItemContainer} onClick={deleteNoteHandler}>
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
              <FontAwesomeIcon color={group?.color} icon={faFolder} />
              <p className="groupLabel">{group?.title}</p>
            </div>
            <div className={s.inputTagsContainer}>
              <i className="fas fa-hashtag"></i>
              <span>{note.tags.join(", ")}</span>
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
              src={note.headerImg}
              alt=""
            />
            <div className={s.noteHeaderInfo}>
              <div className={s.groupCircle} style={{background: group?.color}}></div>
              <h1 className={s.noteTitle}>{note.title}</h1>
            </div>
          </div>
          <Editor readOnly={true} key={note.id} id={note.id} value={dataText} />
        </div>
      </div>
    </>
  );
};

export default Note;
