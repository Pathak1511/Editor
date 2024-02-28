import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import language from "../data/language";
import { initSocket } from "../socket";
import ACTIONS from "../Actions";
import piston from "piston-client";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Fab from "@mui/material/Fab";
import ChatIcon from "@mui/icons-material/Chat";
import Chat from "./../components/Chat";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import BasicTabs from "../components/Tabs";
import { useDispatch, useSelector } from "react-redux";
import Login from "../pages/login";
import axios from "axios";
import BackendAPI from "../hooks/api";
import { setCodeState, setState } from "../store/slice/CodeSlice";
import { setTab } from "../store/slice/SelectTab";

function MainEditor() {
  const dispatch = useDispatch();
  const [user, setuser] = useState(localStorage.getItem("isAuthorized"));
  const reactNavigation = useNavigate();
  const socketRef = useRef(null);
  const codeRef = useRef(null);
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
  const [args, setArgs] = useState("");
  const [isadmin, setAdmin] = useState(false);

  const getCode = () => {
    let cookie = JSON.parse(localStorage.getItem("Cookie"));
    axios
      .get(`${BackendAPI}/v1/Code/get-code/${id}`, {
        headers: {
          Authorization: `Bearer=${cookie}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success("Synchronizing");
        dispatch(setCodeState(response.data.code));
      })
      .catch((error) => toast.error("synchronization error "));
  };

  const [origin, setOrigin] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = origin;

  const data = useSelector((state) => state.code);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOrigin({ ...origin, open: false });
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const onSendCode = async (Currentcode) => {
    setLoading(true);

    const client = piston({ server: "https://emkc.org" });

    const runtimes = await client.runtimes();
    const result = await client.execute({
      language: inputValue,
      files: [
        {
          content: Currentcode,
        },
      ],
      stdin: args,
      args: [args],
      compileTimeout: 10000,
      runTimeout: 3000,
      compileMemoryLimit: -1,
      runMemoryLimit: -1,
    });

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
        reactNavigation("/create-coding-env");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        id,
        username: JSON.parse(localStorage.getItem("userName")),
      });

      // Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId, admin }) => {
          setAdmin(admin);
          if (username !== JSON.parse(localStorage.getItem("userName"))) {
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

    getCode();
    // document.addEventListener("keydown", handleSave);

    return () => {
      // document.removeEventListener("keydown", handleSave);
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.JOIN);
      socketRef.current.disconnect({ id });
    };
  }, []);

  async function copyId() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Id Copied Successfully");
    } catch (err) {
      toast.error("Could not Copy id");
      console.error(err);
    }
  }

  function leaveRoom() {
    dispatch(setState({ set: true }));
    dispatch(setTab({ set: true }));
    reactNavigation("/create-coding-env");
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="Editor_Container">
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
          <ChatIcon background-color="#090b10" sx={{ fontSize: "24" }} />
        </Fab>
        {socketRef.current ? (
          <Chat
            id={id}
            show={show}
            socketRef={socketRef}
            userName={JSON.parse(localStorage.getItem("userName"))}
          />
        ) : (
          <div></div>
        )}
      </div>
      <div className="Main_Container">
        <SideBar clients={clients} />
        <div className="RealTimeEditor">
          <div>
            <BasicTabs
              codeRef={codeRef}
              socketRef={socketRef}
              id={id}
              data={data}
              isadmin={isadmin}
            />
          </div>
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
            <Grid>
              <textarea
                placeholder="Type your input here..."
                rows="4"
                value={args}
                onChange={(e) => setArgs(e.target.value)}
                style={{ color: "#f8f8f8" }}
              ></textarea>
            </Grid>
          </div>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="msg received"
        action={action}
      />
      <div className="Editor-Bottom"></div>
    </div>
  );
}

export default MainEditor;
