import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { withErrorBoundary } from "react-error-boundary";
import { v4 as uuidv4 } from "uuid";
import { OutputData } from "@editorjs/editorjs";
import { motion, Variants } from "framer-motion/dist/framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";

import { useTypeSelector } from "../../hooks/useTypeSelector";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import { useDebounce } from "hooks/useDebounce";
import { useTitle } from "hooks/useTitle";

import { selectNote } from "store/actions/noteActions";
import {
  asyncDeleteNote,
  createAsyncNote,
  editAsyncNotes,
  fixedNote,
  unFixedNote,
} from "../../store/asyncActions/asyncNoteActions";
import { IGroup, IState } from "../../types/state";
import { notesInGroupCounter } from "../../utils/notesInGroupCounter";
import { notifications } from "utils/snowNotifications";

import Editor from "../Editor/Editor";
import GroupItem from "../SideBar/GroupItem/GroupItem";
import Error from "components/Error/Error";

import Button from "../../UI/Button";
import TagsInput from "UI/TagsInput";
import { Input } from "UI/Input/Input";
import Modal from "UI/Modal";
import NoteOptions from "UI/NoteOptions";

import { LANGUAGE } from "UI/LANGUAGES";

import s from "./EditNote.module.scss";

const MAX_DATA_TEXT_LENGTH = 5000;
const MAX_URL_IMG_LENGTH = 255;

interface IParams {
  noteId: string;
}

const getState = (state: IState) => state;

const EditNote: FC = () => {
  const { noteId } = useParams<IParams>();
  const history = useHistory();
  const dispatch = useDispatch();
  const { groups, notes, selectNoteId, lang } = useTypeSelector(getState);
  const firstRender = useRef(false);

  const note = notes.find((note) => note.uuid === noteId);
  const group = groups.find((group) => group.id === note!.group_id);

  useTitle(`Edit | ${note?.title}`);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [showSelectGroupModal, setShowSelectGroupModal] = useState(false);
  const [selectGroup, setSelectGroup] = useState<IGroup>(group!);

  const [tags, setTags] = useState(note ? note.tags : []);

  const [showImageUrlInput, setShowImageUrlInput] = useState(false);
  const [imageUrl, setImageUrl] = useState(note ? note.headerImg : "");

  const [showTitleInput, setShowTitleInput] = useState(false);
  const [title, setTitle] = useState(note ? note.title : "");

  const [editorValue, setEditorValue] = useState<OutputData>(
    note ? JSON.parse(note.text) : ({} as OutputData)
  );

  const [showOptions, setShowOptions] = useState(false);

  const [isTextChanges, setIsTextChanges] = useState(false);
  // const isTagsChanges = tags !== note?.tags.join(", ");
  const isTagsChanges = tags.length !== note?.tags.length;
  const isTitleChanges = title !== note?.title;

  const debouncedDataText = useDebounce<OutputData>(editorValue, 5000);
  const debouncedTitle = useDebounce<string>(title, 2000);
  const debouncedTags = useDebounce<string[]>(tags, 2000);

  const DATA_TEXT_LENGTH = JSON.stringify(editorValue).length;

  useEffect(() => {
    if (firstRender.current && DATA_TEXT_LENGTH > MAX_DATA_TEXT_LENGTH) {
      notifications.error(
        `Limit ${MAX_DATA_TEXT_LENGTH} exceeded. Now ${DATA_TEXT_LENGTH}`
      );
    }
  }, [editorValue]);

  useEffect(() => {
    if (firstRender.current && DATA_TEXT_LENGTH < MAX_DATA_TEXT_LENGTH) {
      editNoteHandler();
      notifications.success("Editor saved!");
      console.log("saved EDITOR");
    }
  }, [debouncedDataText]);

  useEffect(() => {
    if (firstRender.current) {
      editNoteHandler();
      notifications.success("Title saved!");
    }
  }, [debouncedTitle]);

  useEffect(() => {
    if (firstRender.current) {
      editNoteHandler();
      notifications.success("Tags saved!");
    }
  }, [debouncedTags]);

  useEffect(() => {
    if (firstRender.current) {
      editNoteHandler();
      notifications.success("Group changed!");
    }
  }, [selectGroup]);

  const saveNewHeaderImg = () => {
    if (imageUrl.length < MAX_URL_IMG_LENGTH) {
      editNoteHandler();
      setShowImageUrlInput(false);
      notifications.success("Header image changed!");
    } else {
      notifications.error(
        `Limit ${MAX_URL_IMG_LENGTH} exceeded. Now ${imageUrl.length}`
      );
    }
  };

  useEffect(() => {
    firstRender.current = true;
  }, []);

  const outsideClickHandler = () => {
    !showImageUrlInput && history.push(`/note/${note?.uuid}`);
  };

  const outsideInputClickHandler = () => {
    setShowTitleInput(false);
  };

  useOnClickOutside(containerRef, outsideClickHandler);
  useOnClickOutside(inputRef, outsideInputClickHandler);

  const tagsAddHandler = (newTag: string) =>
    setTags((tags) => [...tags, newTag]);

  const tagsDeleteHandler = useCallback(
    (deleteTag: string) =>
      setTags((tags) => tags.filter((tag) => tag !== deleteTag)),
    []
  );

  const showImageUrlModal = () => setShowImageUrlInput(true);
  const closeClickOutsideImageUrlModal = () => {
    setImageUrl(note!.headerImg);
    setShowImageUrlInput(false);
  };

  const imageUrlChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setImageUrl(e.target.value);

  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const showTitleInputHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    title === "Write title note" && setTitle("");
    setShowTitleInput(true);
  };

  const closeTitleInputHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTitleInput(false);
    console.log("hide");
  };

  const toggleSelectGroupModalHandler = () =>
    setShowSelectGroupModal(!showSelectGroupModal);

  const selectGroupHandler = (group: IGroup) => {
    setSelectGroup(group);
    setShowSelectGroupModal(false);
  };

  const closeOptionsModalHandler = (e: React.MouseEvent) => {
    showOptions && setShowOptions(false);
  };

  const toggleOptionsModalHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };

  const stopPropagationEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const editorOnChangeHandler = (value: OutputData) => {
    setIsTextChanges(true);
    setEditorValue(value);
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
        uuid: uuidv4(),
      })
    );
  };

  const deleteNoteHandler = () => {
    dispatch(asyncDeleteNote(selectNoteId as number));
    if (notes.length !== 0) {
      dispatch(
        selectNote(notes.filter((note) => note.id !== selectNoteId)[0].id)
      );
      history.push(
        `/note/${notes.filter((note) => note.id !== selectNoteId)[0].uuid}`
      );
    } else {
      history.push("/");
    }
  };

  const editNoteHandler = () => {
    dispatch(
      editAsyncNotes({
        title,
        text: JSON.stringify(editorValue),
        tags: tags,
        groupId: selectGroup.id,
        headerImg: imageUrl,
      })
    );
    // history.push(`/note/${noteId}`);
  };

  const editNoteClickHandler = () => {
    if (DATA_TEXT_LENGTH < MAX_DATA_TEXT_LENGTH) {
      dispatch(
        editAsyncNotes({
          title,
          text: JSON.stringify(editorValue),
          tags: tags,
          groupId: selectGroup.id,
          headerImg: imageUrl,
        })
      );
      notifications.success("Editor saved!");
    }

    if (DATA_TEXT_LENGTH > MAX_DATA_TEXT_LENGTH) {
      notifications.error(
        `Limit ${MAX_DATA_TEXT_LENGTH} exceeded. Now ${DATA_TEXT_LENGTH}`
      );
    }
  };

  const noteInGroupCounter = notesInGroupCounter(notes);

  let showEditNoteBtn = isTagsChanges || isTitleChanges || isTextChanges;

  const variants: Variants = {
    initial: {
      opacity: 0,
      x: -50,
    },
    show: {
      opacity: 1,
      x: 0,
    },
    hide: {
      opacity: 0,
      x: -50,
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
          onClose={closeClickOutsideImageUrlModal}
        >
          <Input type="url" onChange={imageUrlChangeHandler} />
          <Button className="mt-2" color="#39d695" onClick={saveNewHeaderImg}>
            OK
          </Button>
        </Modal>
      )}

      <motion.div
        initial={"initial"}
        animate={"show"}
        exit={"hide"}
        variants={variants}
        ref={containerRef}
        className={s.container}
        onClick={closeOptionsModalHandler}
      >
        {showOptions && (
          <NoteOptions
            noteFixed={typeof note?.fixed === "boolean" ? note?.fixed : false}
            stopPropagationEvent={stopPropagationEvent}
            pinnedNoteHandler={pinnedNoteHandler}
            copyNoteHandler={copyNoteHandler}
            deleteNoteHandler={deleteNoteHandler}
          />
        )}
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
                {selectGroup ? selectGroup.title : "Select group"}
              </p>
              <FontAwesomeIcon
                className="mb-0.5"
                transform={{ rotate: showSelectGroupModal ? 0 : -90 }}
                icon={faSortDown}
              />
            </div>
            <div className={s.inputTagsContainer}>
              <TagsInput
                tags={tags}
                tagsAddHandler={tagsAddHandler}
                tagsDeleteHandler={tagsDeleteHandler}
              />
            </div>
          </div>
          <div
            className={s.optionsContainer}
            onClick={toggleOptionsModalHandler}
          >
            <div className={s.options}>
              <i className="fas fa-ellipsis-h"></i>
            </div>
          </div>
        </div>
        <div className={s.noteContainer}>
          <div className={s.noteHeader} onClick={closeTitleInputHandler}>
            <img src={imageUrl} alt="" />
            <div className={s.changeImgIcon} onClick={showImageUrlModal}>
              <FontAwesomeIcon icon="folder" />
            </div>
            <div className={s.noteHeaderInfo} onClick={stopPropagationEvent}>
              <div
                className={s.groupCircle}
                style={{ background: selectGroup ? selectGroup.color : "#fff" }}
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
        {showEditNoteBtn && (
          <div className={s.btnCreateNoteContainer}>
            <Button
              className={s.btnCreateNote}
              color="#39d695"
              onClick={editNoteClickHandler}
            >
              Edit
            </Button>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default withErrorBoundary(EditNote, {
  FallbackComponent: Error,
});
