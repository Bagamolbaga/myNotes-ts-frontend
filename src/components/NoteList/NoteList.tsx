import React, { FC, useState, useMemo, memo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";

import { useTypeSelector } from "../../hooks/useTypeSelector";
import { INote } from "../../types/state";

import NoteListItem from "./NoteListItem/NoteListItem";
import SearchHeader from "./SearchHeader/SearchHeader";

import { LANGUAGE } from "UI/LANGUAGES";

import s from "./NoteList.module.scss";

interface IList {
  notes: INote[];
  isPinned: boolean;
  inputFocusHandler?: () => void;
}

const List: FC<IList> = memo(({ notes, isPinned, inputFocusHandler }) => {
  const { selectNoteId } = useTypeSelector((state) => state);

  return (
    <div className={`${s.list} ${isPinned && s.pinnedList}`}>
      <AnimatePresence>
        {notes.map((note) => (
          <NoteListItem
            key={note.id}
            note={note}
            selected={note.id === selectNoteId ? true : false}
            inputFocusHandler={!isPinned ? inputFocusHandler : undefined}
          />
        ))}
      </AnimatePresence>
    </div>
  );
});

const NoteList: FC = () => {
  const { notes, selectedGroup, lang } = useTypeSelector((state) => state);
  const [searchValue, setSearchValue] = useState("");

  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  const inputFocusHandler = () => {
    //  focus() not working.
    inputRef.current.value = ""; //  Needed reset value then set value,
    inputRef.current.value = searchValue; //  because html optimaized the same value. !!!
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filteredNotesByGroup = () => {
    if (typeof selectedGroup === "number") {
      return notes.filter((note) => note.group_id === selectedGroup);
    }

    return notes;
  };

  const pinnedNotes = useMemo(
    () => notes.filter((note) => note.fixed),
    [notes]
  );

  const allNotes = useMemo(
    () =>
      searchValue === ""
        ? filteredNotesByGroup()
        : notes.filter((note) =>
            note.title && note.text && note.tags && searchValue !== null
              ? note.title.toLowerCase().includes(searchValue) ||
                note.text.toLowerCase().includes(searchValue) ||
                note.tags.join(" ").toLowerCase().includes(searchValue)
              : false
          ),
    [notes, searchValue, selectedGroup]
  );

  const sortedNotesByCreatedTime = allNotes.sort(
    (a, b) => Date.parse(b.createdAt!) - Date.parse(a.createdAt!)
  );

  return (
    <motion.div
      initial={{ opacity: 0.7}}
      animate={{ opacity: 1}}
      layout
      className={s.container}
    >
      <SearchHeader
        inputRef={inputRef}
        searchValue={searchValue}
        searchHandler={searchHandler}
      />
      <div className={s.listAndPinnedListContainer}>
        <div>
          <div className={s.listTitle}>
            <i className="fas fa-list-ul"></i>
            <p>{searchValue ? LANGUAGE[lang].NoteList.FilteredNotes : LANGUAGE[lang].NoteList.AllNotes}</p>
            <i className={`fas fa-sort-down ${s.arrowRotate}`}></i>
          </div>
          {!!allNotes.length && (
            <List
              notes={sortedNotesByCreatedTime}
              isPinned={false}
              inputFocusHandler={inputFocusHandler}
            />
          )}
        </div>
        <div
          className={s.pinnedList}
          style={{ maxHeight: 3 * 125 + 61 + "px" }}
        >
          <div className={s.listTitle}>
            <i className="fas fa-list-ul"></i>
            <p>{LANGUAGE[lang].NoteList.PinnedNotes}</p>
            <i className={`fas fa-sort-down ${s.arrowRotate}`}></i>
          </div>
          {pinnedNotes && <List notes={pinnedNotes} isPinned />}
        </div>
      </div>
    </motion.div>
  );
};

export default NoteList;
