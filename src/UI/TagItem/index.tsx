import React, { FC, memo } from "react";
import { motion, Variants } from "framer-motion/dist/framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import s from "./style.module.scss";

interface ITagItem {
  tag: string;
  onlyView: boolean;
  className?: string;
  tagsDeleteHandler?: (dleteTag: string) => void;
}

const TagItem: FC<ITagItem> = memo(
  ({ tag, onlyView, className, tagsDeleteHandler }) => {
    const variants: Variants = {
      initial: {
        opacity: 0,
      },
      show: {
        opacity: 1,
      },
      hide: {
        opacity: 0,
        transition: {
          duration: 0.1,
        },
      },
    };

    return (
      <motion.div
        initial={"initial"}
        animate={"show"}
        exit={"hide"}
        variants={variants}
        className={`${s.container} ${className}`}
      >
        <FontAwesomeIcon className={s.iconHashtag} icon="hashtag" />
        {tag}
        {!onlyView && (
          <FontAwesomeIcon
            className={s.iconDelete}
            icon="xmark"
            onClick={() => tagsDeleteHandler && tagsDeleteHandler(tag)}
          />
        )}
      </motion.div>
    );
  }
);

export default TagItem;
