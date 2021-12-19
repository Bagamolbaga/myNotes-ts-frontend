import React, { ChangeEvent, FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { createAsyncGroup } from "../../store/asyncActions/asyncGroupActions";
import { selectActiveGroup } from "../../store/actions/groupActions";
import { showAllNote } from "../../store/actions/noteActions";
import { IGroup } from "../../types/state";

import GroupItem from "./GroupItem/GroupItem";
import TagsItem from "./TagsItem/TagsItem";
import CreateGroupModal from "./CreateGroupModal";
import s from "./SideBar.module.scss";

const SideBar: FC = () => {
  const dispatch = useDispatch();
  const { user, groups, selectedGroup } = useTypeSelector((state) => state);

  const [showSideBar, setShowSideBar] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [newGroupValue, setNewGroupValue] = useState("");

  const showCreateGroupModalHandler = () => setShowCreateGroupModal(true);

  const closeCreateGroupModalHandler = () => setShowCreateGroupModal(false);

  const newGroupValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setNewGroupValue(e.target.value);

  const createNewGroup = () => {
    if (newGroupValue.length > 0) {
      setShowCreateGroupModal(false);
      setNewGroupValue("");
      dispatch(createAsyncGroup(newGroupValue));
    }
  };

  const onClickGroupHandler = (group: IGroup) => {
    group.id !== selectedGroup
      ? dispatch(selectActiveGroup(group.id))
      : dispatch(showAllNote());
  };

  const showAllNotesHandler = () => dispatch(showAllNote());

  return (
    <>
      {showCreateGroupModal && (
        <CreateGroupModal
          value={newGroupValue}
          onChange={newGroupValueChangeHandler}
          onClose={closeCreateGroupModalHandler}
          createGroup={createNewGroup}
        />
      )}
      <div className={`${s.container} + ${showSideBar ? s.hide : s.show}`}>
        <div className={s.header}>
          <div className={s.personContainer}>
            <div className={s.avatar}>
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
          <p className={s.tabTitle}>All notes</p>
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
            <i className="fas fa-sort-alpha-down"></i>
            <div onClick={showCreateGroupModalHandler}>
              <i className="fas fa-plus"></i>
            </div>
          </div>
        </div>
        <div className={s.groupItemsContainer}>
          {groups &&
            groups.map((group) => (
              <GroupItem
                key={group.id}
                showSideBar={showSideBar}
                color="#c42bc5"
                label={group.title}
                isSelected={selectedGroup === group.id ? true : false}
                onClick={() => onClickGroupHandler(group)}
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
