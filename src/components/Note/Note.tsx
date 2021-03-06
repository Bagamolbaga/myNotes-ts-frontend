import React, { FC, useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { OutputData } from "@editorjs/editorjs";
import { motion, Variants } from "framer-motion/dist/framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-regular-svg-icons";

import { useTypeSelector } from "../../hooks/useTypeSelector";
import { useOnClickOnside } from "hooks/useOnClickOnside";
import { useTitle } from "hooks/useTitle";

import { selectNote } from "../../store/actions/noteActions";
import {
  createAsyncNote,
  fixedNote,
  unFixedNote,
  asyncDeleteNote,
} from "../../store/asyncActions/asyncNoteActions";

import Editor from "components/Editor/Editor";
import TagsInput from "UI/TagsInput";

import s from "./Note.module.scss";
import { withErrorBoundary } from "react-error-boundary";
import Error from "components/Error/Error";


interface IParams {
  noteId: string;
}

const Note: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { noteId } = useParams<IParams>();
  const { notes, groups, selectNoteId } = useTypeSelector((state) => state);

  
  const note = notes.filter((item) => item.uuid === noteId)[0];
  const group = groups.find((group) => group.id === note.group_id);
  const tags = note.tags;

  useEffect(() => {
    if (noteId && typeof selectNoteId === "boolean") {
      dispatch(selectNote(note.id));
    }
  }, []);

  useTitle(note.title);

  const dataText = JSON.parse(note.text) as OutputData;

  const containerRef = useRef<HTMLDivElement>(null);

  const [showOptions, setShowOptions] = useState(false);
  const [showChangeModal, setShowChangeModal] = useState(false);

  const onsideClickHandler = () => {
    history.push(`/edit-note/${noteId}`);
  };

  useOnClickOnside(containerRef, onsideClickHandler);

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
    history.push("/");
  };

  const variants: Variants = {
    initial: {
      opacity: 0,
      x: 50
    },
    show: {
      opacity: 1,
      x: 0,
    },
    hide: {
      opacity: 0,
      x: 50,
      transition: {
        duration: 0.2,
      },
    },
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
      <motion.div
        initial={"initial"}
        animate={"show"}
        exit={"hide"}
        variants={variants}
        ref={containerRef}
        className={s.container}
        onClick={closeModalHandler}
      >
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
              <TagsInput tags={tags} onlyView />
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
            <img src={note.headerImg} alt="" />
            <div className={s.noteHeaderInfo}>
              <div
                className={s.groupCircle}
                style={{ background: group?.color }}
              ></div>
              <h1 className={s.noteTitle}>{note.title}</h1>
            </div>
          </div>
          <Editor readOnly={true} key={note.id} id={note.id} value={dataText} />
        </div>
      </motion.div>
    </>
  );
};

export default withErrorBoundary(Note, {
  FallbackComponent: Error
});
