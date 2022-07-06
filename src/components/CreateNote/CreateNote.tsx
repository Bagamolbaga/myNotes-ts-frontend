import React, { FC, useState, useEffect, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { OutputData } from "@editorjs/editorjs";
import { v4 as uuidv4 } from "uuid";
import { motion, Variants } from "framer-motion/dist/framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faImage } from "@fortawesome/free-regular-svg-icons";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";

import { createAsyncNote } from "../../store/asyncActions/asyncNoteActions";
import { IGroup, IState } from "../../types/state";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import { useTitle } from "hooks/useTitle";
import { notesInGroupCounter } from "../../utils/notesInGroupCounter";

import Editor from "../Editor/Editor";
import GroupItem from "../SideBar/GroupItem/GroupItem";

import Button from "../../UI/Button";
import { Input } from "../../UI/Input/Input";
import Modal from "../../UI/Modal";
import TagsInput from "UI/TagsInput";

import { LANGUAGE } from "UI/LANGUAGES";

import s from "./CreateNote.module.scss";

const getState = (state: IState) => state;

const CreateNote: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { groups, notes, selectNoteId, lang } = useTypeSelector(getState);

  const selectNote = notes.find((note) => note.id === selectNoteId);

  const [showSelectGroupModal, setShowSelectGroupModal] = useState(false);
  const [selectGroup, setSelectGroup] = useState<IGroup | null>(
    !!groups.length ? groups[0] : null
  );

  const [showImageUrlInput, setShowImageUrlInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [title, setTitle] = useState(LANGUAGE[lang].CreatePage.WriteTitle);
  const [editorValue, setEditorValue] = useState<OutputData>();

  const [showChangeModal, setShowChangeModal] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useTitle("Create note");

  useEffect(() => {
    if (typeof selectNoteId === "number")
      history.push(`/note/${selectNote?.uuid}`);
  }, [selectNoteId, selectNote]);

  // const tagsChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
  //   setTags(e.target.value);

  const tagsAddHandler = (newTag: string) =>
    setTags((tags) => [...tags, newTag]);

  const tagsDeleteHandler = useCallback(
    (deleteTag: string) =>
      setTags((tags) => tags.filter((tag) => tag !== deleteTag)),
    []
  );

  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const showImageUrlInputHandler = () => {
    setShowImageUrlInput(true);
  };

  const closeModalImageUrlHandler = () => {
    setShowImageUrlInput(false);
  };

  const ImageUrlInputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setImageUrl(e.target.value);
  };

  const outsideInputClickHandler = () => {
    if (title === "") {
      setTitle(LANGUAGE[lang].CreatePage.WriteTitle);
    }
    setShowTitleInput(false);
  };

  useOnClickOutside(inputRef, outsideInputClickHandler);

  const showTitleInputHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    title === LANGUAGE[lang].CreatePage.WriteTitle && setTitle("");
    setShowTitleInput(true);
  };

  const closeTitleInputHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (title === "") {
      setTitle(LANGUAGE[lang].CreatePage.WriteTitle);
    }
    setShowTitleInput(false);
  };

  const toggleSelectGroupModalHandler = () =>
    setShowSelectGroupModal(!showSelectGroupModal);

  const selectGroupHandler = (group: IGroup) => {
    setSelectGroup(group);
    setShowSelectGroupModal(false);
  };

  const closeChangeGroupModalHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    showChangeModal && setShowChangeModal(false);
  };

  const stopPropagationEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const editorOnChangeHandler = (value: OutputData) => {
    setEditorValue(value);
  };

  const createNoteHandler = () => {
    dispatch(
      createAsyncNote({
        uuid: uuidv4(),
        headerImg: imageUrl,
        title,
        text: JSON.stringify(editorValue),
        tags: tags,
        groupId: selectGroup!.id,
      })
    );
  };

  const noteInGroupCounter = notesInGroupCounter(notes);

  let showCreateNoteBtn =
    tags && title && editorValue && selectGroup ? true : false;

  const variants: Variants = {
    initial: {
      opacity: 0,
      y: -50,
    },
    show: {
      opacity: 1,
      y: 0,
    },
    hide: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      {showImageUrlInput && (
        <Modal
          title={LANGUAGE[lang].Modals.PasteURLImage}
          onClose={closeModalImageUrlHandler}
        >
          <Input
            className={s.imageUrlInput}
            value={imageUrl}
            onChange={ImageUrlInputChangeHandler}
          />
          <Button
            className="mt-2"
            color="#39d695"
            onClick={closeModalImageUrlHandler}
          >
            OK
          </Button>
        </Modal>
      )}
      <motion.div
        initial={"initial"}
        animate={"show"}
        exit={"hide"}
        variants={variants}
        className={s.container}
      >
        {showSelectGroupModal && (
          <div className={s.selectGroupModalContainer}>
            {groups.map((group) => (
              <GroupItem
                onClick={() => selectGroupHandler(group)}
                deleteHandler={() => {}}
                isSelected={group.id === selectGroup?.id ? true : false}
                showSideBar={false}
                color={group.color}
                label={group.title}
                notesCount={noteInGroupCounter[group.id]}
                withIcon={false}
              />
            ))}
          </div>
        )}

        <div className={s.headerContainer}>
          <div className={s.selectAndInputTagsContainer}>
            <div
              className={s.selectGroup}
              onClick={toggleSelectGroupModalHandler}
            >
              <FontAwesomeIcon color={selectGroup?.color} icon={faFolder} />
              <p className="groupLabel">
                {selectGroup
                  ? selectGroup.title
                  : LANGUAGE[lang].CreatePage.UnselectGroup}
              </p>
              <FontAwesomeIcon
                className="mb-0.5"
                transform={{ rotate: showSelectGroupModal ? 0 : -90 }}
                icon={faSortDown}
              />
            </div>
            <TagsInput
              tags={tags}
              tagsAddHandler={tagsAddHandler}
              tagsDeleteHandler={tagsDeleteHandler}
            />
          </div>
        </div>
        <div className={s.noteContainer}>
          <div className={s.noteHeader} onClick={closeTitleInputHandler}>
            <FontAwesomeIcon
              size={"5x"}
              icon={faImage}
              onClick={showImageUrlInputHandler}
            />
            {imageUrl.length > 0 && <img src={imageUrl} alt="" />}

            <div className={s.noteHeaderInfo} onClick={stopPropagationEvent}>
              <div
                className={s.groupCircle}
                style={{ background: selectGroup?.color }}
              ></div>
              {showTitleInput ? (
                <input
                  ref={inputRef}
                  className={s.titleInput}
                  type="text"
                  placeholder="Note title"
                  value={title}
                  onChange={titleChangeHandler}
                />
              ) : (
                <h1 className={s.noteTitle} onClick={showTitleInputHandler}>
                  {title}
                </h1>
              )}
            </div>
          </div>
          <Editor
            readOnly={false}
            key={134}
            id={134}
            value={editorValue}
            onChangeHandler={editorOnChangeHandler}
          />
        </div>
        {showCreateNoteBtn && (
          <div className={s.btnCreateNoteContainer}>
            <Button
              className={s.btnCreateNote}
              color="#39d695"
              onClick={createNoteHandler}
            >
              Create
            </Button>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default CreateNote;
