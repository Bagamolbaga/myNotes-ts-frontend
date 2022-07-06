import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { showCreateNoteForm } from "store/actions/noteActions";
import { useTypeSelector } from "hooks/useTypeSelector";

import { LANGUAGE } from "UI/LANGUAGES";

import s from "./searchHeader.module.scss";

interface SearchHeaderProps {
  searchValue: string;
  searchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.MutableRefObject<HTMLInputElement>;
}

const SearchHeader: FC<SearchHeaderProps> = ({
  searchValue,
  searchHandler,
  inputRef,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const lang = useTypeSelector(state => state.lang)

  const createNoteRedirectHandler = () => {
    dispatch(showCreateNoteForm());
    history.push("/create-note");
  };
  
  return (
    <div className={s.headerContainer}>
      <div className={s.inputContainer}>
        <i className="fas fa-search"></i>
        <input
          ref={inputRef}
          value={searchValue}
          onChange={searchHandler}
          placeholder={LANGUAGE[lang].NoteList.SearchAtr}
          type="text"
        />
      </div>
      <button className={s.btnAdd} onClick={createNoteRedirectHandler}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default SearchHeader;
