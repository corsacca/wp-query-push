//import { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-github";

import SaveButton from "@/components/buttons/SaveButton";

import { useEditor } from "@/hooks/use-editor";

const Editor = ({
  mode,
  defaultValue,
  placeholder,
  onSubmit,
  onClear,
  onSave,
  onShowTables,
  extraEditorActionButtons
}) => {
  const { query, setQuery } = useEditor();
  if (defaultValue && !query) {
    setQuery(defaultValue);
  };
  const onChange = (newValue) => {
    setQuery(newValue);
  };
  return (
    <main className="w-full">
      <label htmlFor="editor">
        <AceEditor
          id="editor"
          aria-label="editor"
          mode={mode}
          theme="github"
          name="editor"
          fontSize={16}
          minLines={15}
          maxLines={15}
          width="100%"
          showPrintMargin={false}
          showGutter
          placeholder={placeholder}
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
          }}
          value={query}
          onChange={onChange}
          showLineNumbers
        />
      </label>
      <div className="flex flex-row justify-between mt-1">
        <div className="flex flex-row space-x-4">
        { onSubmit && (
          <button onClick={() => onSubmit(query)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>{" "}
            Run Query
          </button>
        )}
        { onClear && (
          <button onClick={onClear}>
            <svg
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 inline mr-2"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
            </svg>{" "}
            Clear 
          </button>
        )}
        {/* onSave && <SaveButton onSubmit={onSave} /> */}
        </div>
        { (onShowTables || extraEditorActionButtons) && (
          <div className="flex flex-row space-x-4">
            {onShowTables && (
              <button onClick={onShowTables}>
                Show Tables
              </button>
            )}
            {extraEditorActionButtons}
          </div>
        )}
      </div>
    </main>
  );
};
export default Editor;