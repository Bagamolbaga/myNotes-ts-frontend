import React, { ChangeEvent, MouseEvent, FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

import { useTypeSelector } from "../../hooks/useTypeSelector";

import {
  asyncDeleteGroup,
  createAsyncGroup,
} from "../../store/asyncActions/asyncGroupActions";
import { logout } from "store/asyncActions/asyncUserActions";
import { selectActiveGroup } from "../../store/actions/groupActions";
import { selectNote, showAllNote } from "../../store/actions/noteActions";

import { IGroup } from "../../types/state";

import { notesInGroupCounter } from "../../utils/notesInGroupCounter";
import { notifications } from "utils/snowNotifications";

import GroupItem from "./GroupItem/GroupItem";
import CreateGroupModal from "./CreateGroupModal";
import DeleteGroupYesNoModal from "./DeleteGroupYesNoModal";

import s from "./SideBar.module.scss";

const SideBar: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, groups, notes, selectedGroup, selectNoteId } = useTypeSelector(
    (state) => state
  );

  const [showSideBar, setShowSideBar] = useState(false);
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

    const noteInAnotherGroup = notes.find((note) => note.group_id !== id);
    const noteInDeleteGroup = notes.find((note) => note.id === selectNoteId);

    if (noteInAnotherGroup !== undefined) {
      if (
        ["/note", "/edit"].includes(location.pathname.substring(0, 5)) &&
        noteInDeleteGroup?.group_id === id
      ) {
        dispatch(selectNote(noteInAnotherGroup.id));
        history.push(`/note/${noteInAnotherGroup.id}`);
      }

      dispatch(asyncDeleteGroup(id));
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

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        data-isShow={showSideBar}
        layout
        className={`${s.container}`}
      >
        <div className={s.header}>
          <div className={s.personContainer}>
            <div className={s.avatar} onClick={logoutHandler}>
              {user.isLogin && <img src={user.avatar} alt="Avatar" />}
              <div className={s.iconLogoutContainer}>
                <FontAwesomeIcon size="lg" icon="arrow-right-from-bracket" />
              </div>
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
        <motion.div
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          data-isShow={showSideBar}
          layout
          className={`${s.TabContainer} ${location.pathname === '/' && s.selected}`}
          onClick={goHomeHandler}
        >
          <div className={s.iconContainer}>
            <FontAwesomeIcon icon="house" />
          </div>
          <p className={s.tabTitle}>Home</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          data-isShow={showSideBar}
          layout
          className={`${s.TabContainer} ${location.pathname !== '/' && s.selected}`}
          onClick={showAllNotesHandler}
        >
          <div className={s.iconContainer}>
            <FontAwesomeIcon icon="receipt" />
          </div>
          <p className={s.tabTitle}>Notes</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0.5 }}
          data-isShow={showSideBar}
          layout
          className={`${s.TabContainer} ${s.TabContainerFeature}`}
        >
          <div className={s.iconContainer}>
            <FontAwesomeIcon icon="users" />
          </div>
          <p className={s.tabTitle}>Collective</p>
        </motion.div>
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
                deleteHandler={(e: MouseEvent<HTMLDivElement>) =>
                  showDeleteGroupModalHandler(e, group)
                }
              />
            ))}
        </div>
      </motion.div>
    </>
  );
};

export default SideBar;
