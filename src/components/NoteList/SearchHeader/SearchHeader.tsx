import React, { FC } from "react";
import { Link } from "react-router-dom";
import s from "./searchHeader.module.scss";

interface SearchHeaderProps {
  searchValue: string;
  searchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.MutableRefObject<HTMLInputElement>
}

const SearchHeader: FC<SearchHeaderProps> = ({
  searchValue,
  searchHandler,
  inputRef
}) => {
  return (
    <div className={s.headerContainer}>
      <div className={s.inputContainer}>
        <i className="fas fa-search"></i>
        <input
          ref={inputRef}
          value={searchValue}
          onChange={searchHandler}
          placeholder="search atributes..."
          type="text"
        />
      </div>
      <Link to={'/create-note'}>
        <button className={s.btnAdd}>
          <i className="fas fa-plus"></i>
        </button>
      </Link>
    </div>
  );
};

export default SearchHeader;
