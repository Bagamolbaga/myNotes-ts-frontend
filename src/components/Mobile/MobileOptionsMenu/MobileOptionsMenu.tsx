import React, { ChangeEvent, MouseEvent, FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

import { useTypeSelector } from "hooks/useTypeSelector";

import {
  asyncDeleteGroup,
  createAsyncGroup,
} from "store/asyncActions/asyncGroupActions";
import { logout } from "store/asyncActions/asyncUserActions";
import { selectActiveGroup } from "store/actions/groupActions";
import { selectNote, showAllNote } from "store/actions/noteActions";

import { IGroup } from "types/state";

import { notesInGroupCounter } from "utils/notesInGroupCounter";
import { notifications } from "utils/snowNotifications";

import GroupItem from "components/SideBar/GroupItem/GroupItem";
import CreateGroupModal from "components/SideBar/CreateGroupModal";
import DeleteGroupYesNoModal from "components/SideBar/DeleteGroupYesNoModal";

import s from "./MobileOptionsMenu.module.scss";

const SideBar: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, groups, notes, selectedGroup } = useTypeSelector(
    (state) => state
  );

  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);
  const [selectGroupForDelete, setSelectGroupForDelete] =
    useState<null | IGroup>(null);

  const [newGroupTitleValue, setNewGroupTitleValue] = useState("");
  const [newGroupColorValue, setNewGroupColorValue] = useState("#c16dcb");
  const [reverseGroupList, setReverseGroupList] = useState(false);

  const firstNote = notes[0];

  const goHomeHandler = () => history.push("/");

  const showCreateGroupModalHandler = () => setShowCreateGroupModal(true);
  const closeCreateGroupModalHandler = () => setShowCreateGroupModal(false);

  const showDeleteGroupModalHandler = (e: MouseEvent, group: IGroup) => {
    e.stopPropagation();
    setSelectGroupForDelete(group);
    setShowDeleteGroupModal(true);
  };
  const closeDeleteGroupModalHandler = () => setShowDeleteGroupModal(false);

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
    setShowDeleteGroupModal(false);

    const noteWithAnotherGroup = notes.find((note) => note.group_id !== id);

    if (noteWithAnotherGroup !== undefined) {
      dispatch(selectNote(noteWithAnotherGroup.id));
      dispatch(asyncDeleteGroup(id));
      history.push(`/note/${noteWithAnotherGroup.id}`);
    } else {
      dispatch(showAllNote());
      dispatch(asyncDeleteGroup(id));
      history.push(`/`);
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  const reverseGroupListHandler = () => setReverseGroupList(!reverseGroupList);

  const showAllNotesHandler = () => {
    if (notes.length !== 0) {
      dispatch(selectActiveGroup("All"));
      dispatch(selectNote(firstNote.id));
      history.push(`/note/${firstNote.id}`);
    } else {
      history.push("/create-note");
    }
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

      {showDeleteGroupModal && (
        <DeleteGroupYesNoModal
          group={selectGroupForDelete as IGroup}
          noHandler={closeDeleteGroupModalHandler}
          yesHandler={deleteGroupHandler}
          onClose={closeDeleteGroupModalHandler}
        />
      )}
      <div className={`${s.container}`}>
        <div className={s.header}>
          <div className={s.personContainer}>
            <div className={s.avatar}>
              {user.isLogin && <img src={user.avatar} alt="Avatar" />}
            </div>
            <p className={s.name}>{user.name}</p>
          </div>
          <div className={s.logout} onClick={logoutHandler}>
            <FontAwesomeIcon size="lg" icon="arrow-right-from-bracket" />
          </div>
        </div>
        <p className={s.headTabTitle}>Quick links</p>
        <div className={`${s.TabContainer}`} onClick={goHomeHandler}>
          <div className={s.linksIconContainer}>
            <FontAwesomeIcon icon="house" />
          </div>
          <p className={s.tabTitle}>Home</p>
        </div>
        <div className={`${s.TabContainer}`} onClick={showAllNotesHandler}>
          <div className={s.linksIconContainer}>
            <FontAwesomeIcon icon="receipt" />
          </div>
          <p className={s.tabTitle}>Notes</p>
        </div>
        <div className={`${s.TabContainer}`}>
          <div className={s.linksIconContainer}>
            <FontAwesomeIcon icon="heart" />
          </div>
          <p className={s.tabTitle}>Favorites</p>
        </div>
        <div className={`${s.TabContainer}`}>
          <div className={s.linksIconContainer}>
            <FontAwesomeIcon icon="users" />
          </div>
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
          <AnimatePresence>
            {groupList &&
              groupList.map((group) => (
                <GroupItem
                  key={group.id}
                  showSideBar={false}
                  color={group.color}
                  label={group.title}
                  notesCount={noteInGroupCounter[group.id]}
                  isSelected={selectedGroup === group.id ? true : false}
                  onClick={() => onClickGroupHandler(group)}
                  deleteHandler={(e: MouseEvent<HTMLDivElement>) =>
                    showDeleteGroupModalHandler(e, group)
                  }
                />
              ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default SideBar;
