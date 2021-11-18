import React, { FC, useEffect, useRef, useState } from "react";
import Editor, { OutputData } from "@editorjs/editorjs";
import { modules } from "./Editor-modules";
import s from './styles/Editor.module.scss'

interface EditorJSProps {
  id?: number;
  value: OutputData | undefined;
  readOnly: boolean;
  onChangeHandler?: (value: OutputData) => void;
}

const EditorJS: FC<EditorJSProps> = ({
  id,
  value,
  readOnly,
  onChangeHandler,
}) => {
  let editorRef = useRef<any>();

  const divId = useRef<number>(id! + Math.random());

  useEffect(() => {
    console.log(value);
    const editor = new Editor({
      holder: `editor${divId.current}`,
      data: value ? value : undefined,
      placeholder: "Write content note",
      readOnly: readOnly,
      autofocus: false,
      tools: modules,
      onReady: () => {
        editorRef.current = editor;
      },
      onChange: () => {
        editorRef.current
          .save()
          .then((data: OutputData) => onChangeHandler && onChangeHandler(data));
      },
    });
  }, [id]);

  return (
    <>
      <div id={`editor${divId.current}`} className={s.editorContainer}></div>
    </>
  );
};

export default EditorJS;
