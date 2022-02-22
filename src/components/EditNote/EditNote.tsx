import React, { FC, useState, useEffect, useRef } from "react";
import isShallowEqual from "shallowequal";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { selectNote } from "../../store/actions/noteActions";
import { editAsyncNotes } from "../../store/asyncActions/asyncNoteActions";
import { IGroup, INote, IState } from "../../types/state";
import { OutputData } from "@editorjs/editorjs";
import { notesInGroupCounter } from "../../utils/notesInGroupCounter";
import Editor from "../Editor";
import GroupItem from "../SideBar/GroupItem/GroupItem";
import Button from "../../UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import { faSortDown, faHashtag } from '@fortawesome/free-solid-svg-icons'
import s from "./EditNote.module.scss";

interface IParams {
  noteId: string;
}

const getState = (state: IState) => state;

const EditNote: FC = () => {
  const history = useHistory();
  const { noteId } = useParams<IParams>();
  const dispatch = useDispatch();
  const { groups, notes } = useTypeSelector(getState);

  const note = notes.find((note) => note.id === Number(noteId));
  const group = groups.find((group) => group.id === note?.group_id);

  const [showSelectGroupModal, setShowSelectGroupModal] = useState(false);
  const [selectGroup, setSelectGroup] = useState<IGroup>(group!);
  const [tags, setTags] = useState(note ? note.tags.join(", ") : "");
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [title, setTitle] = useState(note ? note.title : "");
  const [editorValue, setEditorValue] = useState<OutputData>(
    note ? JSON.parse(note.text) : ({} as OutputData)
  );

  const [showOptions, setShowOptions] = useState(false);
  const [showChangeModal, setShowChangeModal] = useState(false);

  const [isTextChanges, setIsTextChanges] = useState(false);
  const isTagsChanges = tags !== note?.tags.join(", ");
  const isTitleChanges = title !== note?.title;

  const tagsChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTags(e.target.value);

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
    setIsTextChanges(true);
    setEditorValue(value);
  };

  const editNoteHandler = () => {
    const tagsArray = tags && tags.trim().split(", ");
    dispatch(
      editAsyncNotes({
        title,
        text: JSON.stringify(editorValue),
        tags: tagsArray,
        groupId: selectGroup.id,
      })
    );
    // history.push(`/note/${noteId}`);
  };

  const noteInGroupCounter = notesInGroupCounter(notes);

  let showEditNoteBtn = isTagsChanges || isTitleChanges || isTextChanges;

  const folderStyle = { color: selectGroup.color };

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
              color="#d83030"
              label="Game"
            /> */}
          </div>
        </div>
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
        {showEditNoteBtn && (
          <div className={s.btnCreateNoteContainer}>
            <Button
              className={s.btnCreateNote}
              color="#39d695"
              onClick={editNoteHandler}
            >
              Edit
            </Button>
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
              <FontAwesomeIcon className="mb-0.5" transform={{ rotate: showSelectGroupModal ? 0 : -90 }} icon={faSortDown} />

            </div>
            <div className={s.inputTagsContainer}>
              <FontAwesomeIcon icon={faHashtag} />
              <input
                value={tags}
                placeholder="tag1, tag2, tag3"
                type="text"
                onChange={tagsChangeHandler}
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
            <img
              src="https://i.pinimg.com/originals/c5/57/04/c55704fa7c9795fc439cb47246d30e27.jpg"
              alt=""
            />
            <div className={s.noteHeaderInfo} onClick={stopPropagationEvent}>
              <div
                className={s.groupCircle}
                style={{ background: selectGroup.color }}
              ></div>
              {showTitleInput ? (
                <input
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
      </div>
    </>
  );
};

export default EditNote;