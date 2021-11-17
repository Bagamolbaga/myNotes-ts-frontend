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

  const divId = id! + Math.random();
  useEffect(() => {
    // if (value && editorRef.current === undefined) {
    //   console.log(editorRef);
      const editor = new Editor({
        holder: `editor${divId}`,
        data: value ? value : undefined,
        readOnly: readOnly,
        onReady: () => {
          editorRef.current = editor;
        },
        onChange: () => {
          editorRef.current
            .save()
            .then(
              (data: OutputData) => onChangeHandler && onChangeHandler(data)
            );
        },
        autofocus: true,
        tools: modules,
      });
    // }
  }, []);

  return (
    <>
      <div id={`editor${divId}`}></div>
    </>
  );
};

export default EditorJS;
