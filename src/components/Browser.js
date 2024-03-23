import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { decodeHtml } from "../hooks/api";

function Browser() {
  const code = useSelector((state) => state.code);
  const [srcDoc, setSrcDoc] = useState();
  const codeRef = useRef(code);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    codeRef.current = code;
    setRefresh((prevRefresh) => !prevRefresh);
  }, [code]);

  useEffect(() => {
    const latestCode = codeRef.current;
    const html = decodeHtml(
      latestCode?.items.find((item) => item.name === "index.html")
        ?.file_content || ""
    );
    const css = decodeHtml(
      latestCode?.items.find((item) => item.name === "index.css")
        ?.file_content || ""
    );
    const js = decodeHtml(
      latestCode?.items.find((item) => item.name === "index.js")
        ?.file_content || ""
    );

    setSrcDoc(`
    <html>
    <style>${css}</style>
    <body>${html}</body>
    <script>${js}</script>
    </html>
  `);
  }, [refresh]);

  return (
    <Box
      display="flex"
      alignItems="start"
      justifyContent="start"
      flexDirection="column"
      padding="6px"
      height="100%"
      className={refresh ? "fade-in" : ""}
    >
      <iframe
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        frameBorder="0"
        width="100%"
        height="100%"
      />
    </Box>
  );
}

export default Browser;
