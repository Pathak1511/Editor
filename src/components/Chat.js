import React, { useState, useEffect, useRef } from "react";
import { Box, Fab, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ACTIONS from "../Actions";

function Chat({ id, show, socketRef, userName }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const isEffectSetup = useRef(false);

  useEffect(() => {
    if (socketRef.current && !isEffectSetup.current) {
      socketRef.current.on(ACTIONS.CHAT, (msg) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: msg.inputText,
            sender: msg.id === socketRef.current?.id ? "user" : "receiver",
            userName: msg.userName,
            isJoined: msg?.isJoined,
          },
        ]);
        setInputText("");
      });
      isEffectSetup.current = true;
    }
  }, [socketRef.current, inputText]);

  const handleSendClick = () => {
    const msgobj = {
      room_id: id,
      id: socketRef.current.id,
      inputText: inputText,
      userName: userName,
      isJoined: false,
    };

    socketRef.current.emit(ACTIONS.CHAT, msgobj);
  };

  return (
    <div className="chat-message" style={{ display: show }}>
      <Box
        className="chat-message-box"
        sx={{
          width: 340,
          height: 540,
          backgroundColor: "#090B10",
          position: "relative",
          padding: "16px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className="chat-container">
              <div className="chat-messages">
                {messages
                  .slice(0)
                  .reverse()
                  .map((message, index) =>
                    message.isJoined ? (
                      <div className="joined" key={index}>
                        {message.text}
                      </div>
                    ) : (
                      <div
                        key={index}
                        className={` ${
                          message.sender === "user"
                            ? "sent-message"
                            : "received-message"
                        }`}
                      >
                        <div className="message-box">
                          {message.sender === "user"
                            ? `${message.text} : You`
                            : `${message.userName} : ${message.text}`}
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
          </Grid>
          <Grid item xs={10}>
            <div className="chat-send-box">
              <input
                className="chat-send"
                variant="outlined"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendClick();
                  }
                }}
              />
              <Fab
                variant="extended"
                size="small"
                color="primary"
                aria-label="send"
                onClick={handleSendClick}
                sx={{
                  backgroundColor: "#23262a",
                  marginLeft: "6px",
                  borderRadius: "8px",
                }}
              >
                <SendIcon />
              </Fab>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Chat;
