import React, { FC } from "react";
import s from "./TagsItem.module.scss";

interface TagsItemProps {
  label: string;
}

const TagsItem: FC<TagsItemProps> = ({ label }) => {
  return (
    <div className={s.tagsItem}>
      <i className="fas fa-hashtag"></i>
      <p>
        {label}
        <span className={s.tagsItemCount}>2/10</span>
      </p>
    </div>
  );
};

export default TagsItem;
