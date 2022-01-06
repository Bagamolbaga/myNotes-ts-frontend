import React, { FC, useState, useMemo, useRef, useCallback } from "react";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import NoteListItem from "./NoteListItem/NoteListItem";
import SearchHeader from "./SearchHeader/SearchHeader";
import s from "./NoteList.module.scss";
import { INote } from "../../types/state";

const List: FC<{ notes: INote[] }> = ({ notes }) => {
  const { selectNoteId } = useTypeSelector((state) => state);

  return (
    <div className={s.list}>
      {notes.map((note) => (
        <NoteListItem
          key={note.id}
          note={note}
          selected={note.id === selectNoteId ? true : false}
        />
      ))}
    </div>
  );
};

const NoteList: FC = () => {
  const { notes, selectedGroup } = useTypeSelector((state) => state);
  const [searchValue, setSearchValue] = useState("");

  const inputRef = useRef<any>(null)

  const pinnedNotes = useMemo(
    () => notes.filter((note) => note.fixed),
    [notes]
  );

  const filteredNotesByGroup = useCallback(() => {
    if (typeof selectedGroup === 'number') {
      return notes.filter(note => note.group_id === selectedGroup)
    }
    
    return notes
  }, [notes, selectedGroup])

  const allNotes = useMemo(() => (
    searchValue === ""
      ? filteredNotesByGroup()
      : notes.filter((note) =>
          note.title && note.text && note.tags && searchValue !== null
            ? note.title.toLowerCase().includes(searchValue) ||
              note.text.toLowerCase().includes(searchValue) ||
              note.tags.join(" ").toLowerCase().includes(searchValue)
            : false
        )
  ), [notes, searchValue, filteredNotesByGroup])

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={s.container}>
      <SearchHeader
        key="inputs"
        searchValue={searchValue}
        searchHandler={searchHandler}
      />
      <div className={s.listAndPinnedListContainer}>
        <div>
          <div className={s.listTitle}>
            <i className="fas fa-list-ul"></i>
            <p>{searchValue ? 'Filtered notes' : 'All notes'}</p>
            <i className={`fas fa-sort-down ${s.arrowRotate}`}></i>
          </div>
            <List notes={allNotes} />
        </div>
        <div
          className={s.pinnedList}
          style={{ maxHeight: 3 * 125 + 61 + "px" }}
        >
          <div className={s.listTitle}>
            <i className="fas fa-list-ul"></i>
            <p>Pinned notes</p>
            <i className={`fas fa-sort-down ${s.arrowRotate}`}></i>
          </div>
          {pinnedNotes && <List notes={pinnedNotes} />}
        </div>
      </div>
    </div>
  );
};

export default NoteList;
