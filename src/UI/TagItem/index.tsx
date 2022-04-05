import React, { FC, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import s from "./style.module.scss";

interface ITagItem {
  tag: string;
  onlyView: boolean;
  tagsDeleteHandler?: (dleteTag: string) => void;
}

const TagItem: FC<ITagItem> = memo(({ tag, onlyView, tagsDeleteHandler }) => {
  return (
    <div className={s.container}>
      <FontAwesomeIcon className={s.iconHashtag} icon="hashtag" />
      {tag}
      {!onlyView && (
        <FontAwesomeIcon
          className={s.iconDelete}
          icon="xmark"
          onClick={() => tagsDeleteHandler && tagsDeleteHandler(tag)}
        />
      )}
    </div>
  );
});

export default TagItem;
