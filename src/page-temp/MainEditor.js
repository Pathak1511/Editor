import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import language from "../data/language";
import { initSocket } from "../socket";
import ACTIONS from "../Actions";
import piston from "piston-client";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";
import Fab from "@mui/material/Fab";
import ChatIcon from "@mui/icons-material/Chat";
import Chat from "./../components/Chat";
import Editor from "./../components/Editor";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function MainEditor() {
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

  const handleSetValue = (value) => {
    setValue(value);
  };
  const handleSetInputValue = (value) => {
    setInputValue(value);
  };

  const { id } = useParams();
  const [clients, setClients] = useState([]);
  const [output, setOutput] = useState("");
  const [outputSubject, setoutputSubject] = useState(["Success", "#2e7d32"]);
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

  return (
    <div>
      <Header
        leaveRoom={leaveRoom}
        copyId={copyId}
        handleSetValue={handleSetValue}
        handleSetInputValue={handleSetInputValue}
        value={value}
        inputValue={inputValue}
        codeRef={codeRef}
        onSendCode={onSendCode}
      />
      <div className="chat-icon">
        <Fab
          color="#090b10"
          aria-label="add"
          size="medium"
          onClick={() => (show === "" ? setShow("none") : setShow(""))}
        >
          <ChatIcon background-color="#090b10" />
        </Fab>
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
      </div>
      <div className="Main_Container">
        <SideBar clients={clients} />
        <div className="RealTimeEditor">
          <Editor
            socketRef={socketRef}
            id={id}
            onCodeChange={(code) => {
              codeRef.current = code;
            }}
          />
        </div>
        <div className="Output">
          <div className="Output_Container">
            <div className="Output_Header">
              <div>Output</div>
              {loading ? (
                <CircularProgress color="success" size={20} />
              ) : (
                <div></div>
              )}
            </div>

            <Grid
              item
              style={{
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
          </div>
          <div className="Output_Container">
            <div className="Output_Header">
              <div>Input</div>
            </div>
          </div>
        </div>
      </div>
      <div className="Editor-Bottom"></div>
    </div>
  );
}

export default MainEditor;
