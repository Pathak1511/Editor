import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
// importing css
import "codemirror/lib/codemirror.css";
// // import for js
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike";

// // import for theme
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import ACTIONS from "../Actions";
import "codemirror/theme/material-darker.css";

const Editor = ({ socketRef, id, onCodeChange, tabId, data, isadmin }) => {
  const editorRef = useRef(null);
  const fetchFileContent = (node) => {
    if (node.id === tabId && node.isFolder === false) {
      return node.file_content;
    }

    for (let i = 0; i < node.items.length; i++) {
      const content = fetchFileContent(node.items[i]);
      if (content) {
        return content;
      }
    }
    return null;
  };

  // const getData = (data) =>{

  // }

  const userName = JSON.parse(localStorage.getItem("userName"));
  useEffect(() => {
    async function init() {
      editorRef.current = await Codemirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: {
            name: "javascript",
            json: true,
          },
          theme: "material-darker",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );

      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            id,
            currentTabId: tabId,
            code,
            userName,
          });
        }
      });
    }
    init();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(
        ACTIONS.CODE_CHANGE,
        ({ currentTabId, code, userName }) => {
          if (code !== "" && currentTabId === tabId) {
            editorRef.current.setValue(code);
          }
        }
      );
    }

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);

  useEffect(() => {
    const tabContent = fetchFileContent(data) || "";
    if (editorRef.current) {
      editorRef.current.setValue(tabContent);
    }
  }, [tabId]);

  return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;
