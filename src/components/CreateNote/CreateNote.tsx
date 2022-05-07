import React, { FC, useState, useEffect, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { IGroup, IState } from "../../types/state";
import { OutputData } from "@editorjs/editorjs";
import Editor from "../Editor/Editor";
import GroupItem from "../SideBar/GroupItem/GroupItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faImage } from "@fortawesome/free-regular-svg-icons";
import { faSortDown, faHashtag } from "@fortawesome/free-solid-svg-icons";
import s from "./CreateNote.module.scss";
import Button from "../../UI/Button";
import { createAsyncNote } from "../../store/asyncActions/asyncNoteActions";
import { notesInGroupCounter } from "../../utils/notesInGroupCounter";
import { Input } from "../../UI/Input/Input";
import Modal from "../../UI/Modal";
import TagsInput from "UI/TagsInput";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import { useHistory } from "react-router-dom";
import { useTitle } from "hooks/useTitle";

const getState = (state: IState) => state;

const Note: FC = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const { groups, notes, selectNoteId } = useTypeSelector(getState);

  const [showSelectGroupModal, setShowSelectGroupModal] = useState(false);
  const [selectGroup, setSelectGroup] = useState<IGroup | null>(!groups.length ? null : groups[0]);
  const [showImageUrlInput, setShowImageUrlInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [title, setTitle] = useState("Write title note");
  const [editorValue, setEditorValue] = useState<OutputData>();

  const [showOptions, setShowOptions] = useState(false);
  const [showChangeModal, setShowChangeModal] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null)
  
  useTitle('Create note')

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
    if (title === '') {
      setTitle('Write title note')
    }
    setShowTitleInput(false);
  };

  useOnClickOutside(inputRef, outsideInputClickHandler);

  const showTitleInputHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    title === "Write title note" && setTitle("");
    setShowTitleInput(true);
  };

  const closeTitleInputHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (title === "") {
      setTitle("Write title note");
    }
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

  const editorOnChangeHandler = (value: OutputData) => {
    setEditorValue(value);
  };

  const createNoteHandler = () => {
    dispatch(
      createAsyncNote({
        headerImg: imageUrl,
        title,
        text: JSON.stringify(editorValue),
        tags: tags,
        groupId: selectGroup!.id,
      })
    );
  };

  useEffect(() => {
    if (typeof selectNoteId === 'number') history.push(`/note/${selectNoteId}`)
  }, [selectNoteId])

  const noteInGroupCounter = notesInGroupCounter(notes);

  let showCreateNoteBtn =
    tags && title && editorValue && selectGroup ? true : false;

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
              isSelected={false}
              onClick={() => null}
              showSideBar={false}
              color="#c42bc5"
              label="Gachi"
            /> */}
          </div>
        </div>
      )}
      {showImageUrlInput && (
        <Modal title="Paste URL image" onClose={closeModalImageUrlHandler}>
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
      <div className={s.container} onClick={closeOptionsModalHandler}>
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
                {selectGroup ? selectGroup.title : "Unselect group"}
              </p>
              <FontAwesomeIcon
                className="mb-0.5"
                transform={{ rotate: showSelectGroupModal ? 0 : -90 }}
                icon={faSortDown}
              />
            </div>
            {/* <div className={s.inputTagsContainer}>
              <FontAwesomeIcon icon={faHashtag} />

              <input
                value={tags}
                placeholder="Add tags"
                type="text"
                name="tags"
                onChange={tagsChangeHandler}
              />
            </div> */}
            <TagsInput
              tags={tags}
              tagsAddHandler={tagsAddHandler}
              tagsDeleteHandler={tagsDeleteHandler}
            />
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
      </div>
    </>
  );
};

export default Note;
