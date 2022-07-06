import React, { FC, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

import { useTypeSelector } from "hooks/useTypeSelector";

import { setLanguage } from "store/actions/otherActions";

import FlagRussia from "assets/flag_russia.png";
import FlagUsa from "assets/flag_usa.png";

import s from "./ChangeLanguage.module.scss";
import { useOnClickOutside } from "hooks/useOnClickOutside";

const flags = {
  "ru-RU": FlagRussia,
  "en-US": FlagUsa,
};

type TLang = "ru-RU" | "en-US";

interface ChangeLanguageProps {
  showSideBar: boolean;
}

const ChangeLanguage: FC<ChangeLanguageProps> = ({ showSideBar }) => {
  const dispatch = useDispatch();
  const lang = useTypeSelector((state) => state.lang);

  const [showFlags, setShowFlags] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFlagsHandler = () => setShowFlags(!showFlags);
  const closeFlagsHandler = () => setShowFlags(false);

  const selectFlagHandler = (lang: TLang) => {
    dispatch(setLanguage(lang));
    localStorage.setItem("LANGUAGE", lang);
    setShowFlags(false);
  };

  useOnClickOutside(containerRef, closeFlagsHandler);

  const anotherFlags = Object.keys(flags).filter((flag) => flag !== lang);

  return (
    <motion.div
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 1 }}
      data-isShow={showSideBar}
      layout
      className={s.container}
      ref={containerRef}
    >
      {showFlags && (
        <div className={s.flagList}>
          {(anotherFlags as TLang[]).map((flag: TLang) => (
            <div className={s.country} onClick={() => selectFlagHandler(flag)}>
              <img src={flags[flag]} alt={flag} />
            </div>
          ))}
        </div>
      )}
      <div className={s.selectCountry} onClick={toggleFlagsHandler}>
        <img src={flags[lang]} alt={lang} />
      </div>
    </motion.div>
  );
};

export default ChangeLanguage;
