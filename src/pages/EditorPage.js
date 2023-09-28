import React, { useEffect, useRef, useState } from "react";
import { initSocket } from "../socket";
import Client from "../components/Client";
import ACTIONS from "../Actions";
import Editor from "../components/Editor";
import language from "../data/language";
import piston from "piston-client";
import Folder from "./../components/Folder";
import Chat from "./../components/Chat";
import BasicTabs from "../components/BasicTabs";
// Material Ui
import Fab from "@mui/material/Fab";
import ChatIcon from "@mui/icons-material/Chat";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

// Material UI end

import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";
///////////////////////////////////
import useTraverseTree from "./../hooks/use-traverse-tree";
import explorer from "./../data/folderData";

const EditorPage = () => {
  // new addes
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode, deleteNode } = useTraverseTree();
  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleDeleteNode = (folderId, item) => {
    const finalTree = deleteNode(explorerData, folderId);
  };
  // new added end
  const reactNavigation = useNavigate();
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();

  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const [value, setValue] = useState(language[0]);
  const [inputValue, setInputValue] = useState(language[0]);

  const { id } = useParams();
  const [clients, setClients] = useState([]);
  const [output, setOutput] = useState("");
  const [outputSubject, setoutputSubject] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState("none");

  const onSendCode = async (Currentcode) => {
    // send request to backend server for getting output

    setLoading(true);

    const client = piston({ server: "https://emkc.org" });

    const runtimes = await client.runtimes();
    const result = await client.execute(inputValue, Currentcode);
    if (result?.run?.stderr === "") {
      const result_output = result?.run?.output.replace(/\n/g, "<br>");
      setOutput(result_output);
      setoutputSubject(["Success", "#2e7d32"]);
    } else {
      const compileError = result?.compile?.stderr;
      const errorOutput =
        compileError === "undefined"
          ? "Compile error\n" +
            result?.compile?.stderr.replace(/\n/g, "<br>") +
            "\nRuntime error\n" +
            result?.run?.stderr.replace(/\n/g, "<br>")
          : "\nRuntime error\n" + result?.run?.stderr.replace(/\n/g, "<br>");

      setOutput(errorOutput.replace(/\n/g, "<br>"));
      setOutput(result?.run?.stderr.replace(/\n/g, "<br>"));
      setoutputSubject(["Error", "#ff3333"]);
    }
    setLoading(false);
    if (!expanded) handleChange();
  };

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed,try again later");
        reactNavigation("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        id,
        username: location.state?.userName,
      });

      // Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      // listening disconnected event
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();

    return () => {
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.JOIN);
      socketRef.current.disconnect();
    };
  }, []);

  async function copyId() {
    try {
      await navigator.clipboard.writeText(id);
      toast.success("Id Copied Successfully");
    } catch (err) {
      toast.error("Could not Copy id");
      console.error(err);
    }
  }

  function leaveRoom() {
    reactNavigation("/");
  }

  if (!location.state) {
    return <Navigate to="/" />;
  }
  return (
    <div className="editorWrap">
      {/* Setting */}

      {/* left part */}
      <div className="sidebar">
        <Grid item xs={4} className="asideInner">
          {/* <div className="logo">
            <img src="/main-Logo.png" alt="Logo" className="EditorPageLogo" />
          </div> */}
          <div>
            <Folder
              handleInsertNode={handleInsertNode}
              handleDeleteNode={handleDeleteNode}
              explorer={explorerData}
            />
          </div>

          <h3>Connected</h3>
          <div className="clientList">
            {clients.map((client) => (
              <Client key={client.socketId} userName={client.username} />
            ))}
          </div>
        </Grid>

        <button className="btn copyBtn" onClick={copyId}>
          Copy Room Id
        </button>
        <button className="btn leaveBtn" onClick={leaveRoom}>
          Leave
        </button>
      </div>
      {/* right part */}
      <Box>
        <Grid container height="100vh">
          {/* Compiler */}
          <Grid item xs={8} spacing={0} backgroundColor="#090B10">
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="center"
              padding="16px"
              height="60px"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography color="#f8f8f8">Compiler</Typography>
              </Grid>
              <Grid item xs={4}>
                {/* Dropdown */}

                <Autocomplete
                  variant="standard"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  id="flat-demo"
                  size="small"
                  sx={{ width: 180 }}
                  clearOnEscape
                  options={language}
                  renderInput={(params) => (
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      {...params}
                      className="languageText"
                      label="C++"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Button
                  variant="contained"
                  className="btn btnRun"
                  color="success"
                  onClick={() => {
                    inputValue !== "" && codeRef.current !== null
                      ? onSendCode(codeRef.current)
                      : toast.error("Please write code first");
                  }}
                >
                  Run
                </Button>
              </Grid>
            </Grid>

            <Grid item xs={12} height="40px">
              <BasicTabs />
            </Grid>
            {/* Editor Code start here */}
            <Grid item xs={12} className="RealTimeEditor">
              <Editor
                socketRef={socketRef}
                id={id}
                onCodeChange={(code) => {
                  codeRef.current = code;
                }}
              />
              {/* <Aceeditor /> */}
            </Grid>
            {/* Editor Code end here */}
          </Grid>

          <Grid container xs={4} backgroundColor="#23262a">
            {/* Output */}
            <Grid item xs={12}>
              <Grid
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="60px"
                paddingLeft="12px"
                backgroundColor="#090B10"
              >
                <Grid item xs={4}>
                  <Typography color="#f8f8f8">Output &nbsp;&nbsp;</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography sx={{ color: outputSubject[1] }}>
                    {outputSubject[0]} &nbsp;&nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  {loading ? (
                    <CircularProgress color="success" size={20} />
                  ) : (
                    <div></div>
                  )}
                </Grid>
              </Grid>

              <Grid
                item
                style={{
                  backgroundColor: "#282b30",
                  overflow: "auto",
                }}
              >
                <Typography
                  className="output"
                  style={
                    outputSubject[0] === "Error"
                      ? { color: outputSubject[1] }
                      : { color: "#f8f8f8" }
                  }
                  dangerouslySetInnerHTML={{ __html: output }}
                ></Typography>
              </Grid>
            </Grid>
            {/* Custom input */}
            <Grid item xs={12} backgroundColor="#23262a">
              <Grid
                item
                display="flex"
                height="60px"
                justifyContent="center"
                alignItems="center"
                paddingLeft="12px"
                backgroundColor="#090B10"
              >
                <Grid item xs={12}>
                  <Typography color="#f8f8f8">
                    Custum Input &nbsp;&nbsp;
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  backgroundColor: "#282b30",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextField
                  variant="standard"
                  multiline
                  rows={12}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    outline: "none",
                  }}
                  inputProps={{
                    style: {
                      color: "#f8f8f8",
                    },
                    disableUnderline: true,
                  }}
                >
                  Hello
                </TextField>
              </Grid>
            </Grid>
          </Grid>

          <div className="chat-icon">
            <Fab
              color="primary.dark"
              aria-label="add"
              onClick={() => (show === "" ? setShow("none") : setShow(""))}
            >
              <ChatIcon />
            </Fab>
          </div>
          {socketRef.current ? (
            <Chat
              show={show}
              socketRef={socketRef}
              id={id}
              userName={location.state?.userName}
            />
          ) : (
            <div></div>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default EditorPage;
