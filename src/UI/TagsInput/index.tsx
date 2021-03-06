import React, { FC, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion/dist/framer-motion";

import TagItem from "UI/TagItem";

import s from "./style.module.scss";

interface ITagsInput {
  tags: string[];
  onlyView?: boolean;
  tagsAddHandler?: (newTag: string) => void;
  tagsDeleteHandler?: (newTag: string) => void;
}

const TagsInput: FC<ITagsInput> = ({
  tags,
  onlyView = false,
  tagsAddHandler,
  tagsDeleteHandler,
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (onlyView) return;
    if (!value) return;

    const arrTags = value.split(" ");

    if (arrTags.length > 1) {
      const newTag = arrTags[0];
      tagsAddHandler && tagsAddHandler(newTag);
      setValue("");
    }
  }, [value, onlyView]);

  return (
    <div className={s.container}>
      <div className={s.tagItemsContainer}>
      <AnimatePresence>
        {tags &&
          tags.map((tag, index) => (
            <TagItem
              key={index}
              onlyView={onlyView}
              tag={tag}
              tagsDeleteHandler={tagsDeleteHandler}
            />
          ))}
      </AnimatePresence>
      </div>
      {!onlyView && tags.length < 7 && (
        <input
          className={s.tagsInput}
          type="text"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
        />
      )}
    </div>
  );
};

export default TagsInput;
