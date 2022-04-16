import React, { ChangeEvent, FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypeSelector } from "../../hooks/useTypeSelector";

import {
  asyncDeleteGroup,
  createAsyncGroup,
} from "../../store/asyncActions/asyncGroupActions";
import { selectActiveGroup } from "../../store/actions/groupActions";
import { selectNote, showAllNote } from "../../store/actions/noteActions";

import { IGroup } from "../../types/state";

import { notesInGroupCounter } from "../../utils/notesInGroupCounter";
import { notifications } from "utils/snowNotifications";

import GroupItem from "./GroupItem/GroupItem";
import TagsItem from "./TagsItem/TagsItem";
import CreateGroupModal from "./CreateGroupModal";

import s from "./SideBar.module.scss";
import { logout } from "store/asyncActions/asyncUserActions";
import { useHistory } from "react-router-dom";

const SideBar: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, groups, notes, selectedGroup } = useTypeSelector(
    (state) => state
  );

  const [showSideBar, setShowSideBar] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [newGroupTitleValue, setNewGroupTitleValue] = useState("");
  const [newGroupColorValue, setNewGroupColorValue] = useState("#c16dcb");
  const [reverseGroupList, setReverseGroupList] = useState(false);

  const firstNote = notes[0]

  const showCreateGroupModalHandler = () => setShowCreateGroupModal(true);

  const closeCreateGroupModalHandler = () => setShowCreateGroupModal(false);

  const newGroupTitleValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setNewGroupTitleValue(e.target.value);

  const newGroupColorValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setNewGroupColorValue(e.target.value);

  const createNewGroup = () => {
    if (newGroupTitleValue.length > 0) {
      setShowCreateGroupModal(false);
      setNewGroupTitleValue("");
      dispatch(createAsyncGroup(newGroupTitleValue, newGroupColorValue));
      notifications.success("New group created!");
    }
  };

  const onClickGroupHandler = (group: IGroup) => {
    group.id !== selectedGroup
      ? dispatch(selectActiveGroup(group.id))
      : dispatch(showAllNote());
  };

  const deleteGroupHandler = (id: number) => {
    dispatch(asyncDeleteGroup(id));
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  const reverseGroupListHandler = () => setReverseGroupList(!reverseGroupList);

  const showAllNotesHandler = () => {
    dispatch(selectActiveGroup('All'))
    dispatch(selectNote(firstNote.id));
    history.push(`/note/${firstNote.id}`);
  };

  const noteInGroupCounter = notesInGroupCounter(notes);

  const groupList = reverseGroupList === true ? [...groups].reverse() : groups;

  return (
    <>
      {showCreateGroupModal && (
        <CreateGroupModal
          titleValue={newGroupTitleValue}
          colorValue={newGroupColorValue}
          onTitleChange={newGroupTitleValueChangeHandler}
          onColorChange={newGroupColorValueChangeHandler}
          onClose={closeCreateGroupModalHandler}
          createGroup={createNewGroup}
        />
      )}
      <div className={`${s.container} + ${showSideBar ? s.hide : s.show}`}>
        <div className={s.header}>
          <div className={s.personContainer}>
            <div className={s.avatar} onClick={logoutHandler}>
              <img src={user.avatar} alt="" />
            </div>
            <p className={s.name}>{user.name}</p>
          </div>
          <div
            className={`${!showSideBar && s.arrowRotate} +  ${s.arrow}`}
            onClick={() => setShowSideBar(!showSideBar)}
          >
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
        <p className={s.headTabTitle}>Quick links</p>
        <div
          className={`${s.TabContainer} + ${
            showSideBar ? s.reverseTabOnlyIcon : s.reverseTabAllContent
          }`}
          onClick={showAllNotesHandler}
        >
          <i className="far fa-sticky-note"></i>
          <p className={s.tabTitle}>Notes</p>
        </div>
        <div
          className={`${s.TabContainer} + ${
            showSideBar ? s.reverseTabOnlyIcon : s.reverseTabAllContent
          }`}
        >
          <i className="far fa-heart"></i>
          <p className={s.tabTitle}>Favorites</p>
        </div>
        <div
          className={`${s.TabContainer} + ${
            showSideBar ? s.reverseTabOnlyIcon : s.reverseTabAllContent
          }`}
        >
          <i className="fas fa-users"></i>
          <p className={s.tabTitle}>Collective</p>
        </div>
        <div className={s.groupsTitleContainer}>
          <div>
            <p className={s.headTabTitle}>Groups</p>
          </div>
          <div className={s.groupsIconsContainer}>
            <div onClick={reverseGroupListHandler}>
              <i
                className={`fas ${
                  reverseGroupList ? "fa-sort-alpha-up" : "fa-sort-alpha-down"
                }`}
              ></i>
            </div>
            <div onClick={showCreateGroupModalHandler}>
              <i className="fas fa-plus"></i>
            </div>
          </div>
        </div>
        <div className={s.groupItemsContainer}>
          {groupList &&
            groupList.map((group) => (
              <GroupItem
                key={group.id}
                showSideBar={showSideBar}
                color={group.color}
                label={group.title}
                notesCount={noteInGroupCounter[group.id]}
                isSelected={selectedGroup === group.id ? true : false}
                onClick={() => onClickGroupHandler(group)}
                deleteHandler={() => deleteGroupHandler(group.id)}
              />
            ))}
        </div>
        <div className={s.tagsTitleContainer}>
          <div>
            <p className={s.headTabTitle}>Groups</p>
          </div>
          <div className={s.tagsIconsContainer}>
            <i className="fas fa-plus"></i>
          </div>
        </div>
        <div className={s.tagItemsContainer}>
          <TagsItem label="searchbytag" />
          <TagsItem label="searchbytag" />
          <TagsItem label="searchbytag" />
          <TagsItem label="searchbytag" />
          <TagsItem label="searchbytag" />
          <TagsItem label="searchbytag" />
          <TagsItem label="searchbytag" />
        </div>
      </div>
    </>
  );
};

export default SideBar;
