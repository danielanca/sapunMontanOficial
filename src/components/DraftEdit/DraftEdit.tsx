import React, { Component, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

const DraftEdit = () => {
  const [editorState, setEditorState] = useState<any>();

  const onEditorStateChange = () => {};
  return (
    <>
      <div>
        {/* <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
        /> */}
      </div>
    </>
  );
};

export default DraftEdit;
