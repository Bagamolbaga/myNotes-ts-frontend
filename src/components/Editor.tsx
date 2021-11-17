import React, { FC, useEffect, useRef, useState } from "react";
import Editor, { OutputData } from "@editorjs/editorjs";
import { modules } from "./Editor-modules";

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
  const initEditor = () => {};

  initEditor();

  const divId = useRef<number>(id! + Math.random());
  useEffect(() => {
    // divId.current = id! + Math.random();
    const editor = new Editor({
      holder: `editor${divId.current}`,
      data: value ? value : undefined,
      placeholder: 'Write content note',
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
  }, []);

  return (
    <>
      <div id={`editor${divId.current}`}></div>
    </>
  );
};

export default EditorJS;
