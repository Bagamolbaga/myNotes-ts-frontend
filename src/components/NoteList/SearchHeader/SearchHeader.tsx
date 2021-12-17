import React, { FC } from "react";
import s from "./searchHeader.module.scss";

interface SearchHeaderProps {
  searchValue: string;
  searchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchHeader: FC<SearchHeaderProps> = ({
  searchValue,
  searchHandler,
}) => {
  return (
    <div className={s.headerContainer}>
      <div className={s.inputContainer}>
        <i className="fas fa-search"></i>
        <input
          key="searchInput"
          value={searchValue}
          onChange={searchHandler}
          placeholder="search..."
          type="text"
        />
      </div>
      <button className={s.btnAdd}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default SearchHeader;