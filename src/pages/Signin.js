import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CodeIcon from "@mui/icons-material/Code";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/Pathak1511">
        Admin
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Signin() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [userName, setuserName] = useState("");
  const [Password, setPassword] = useState("");

  const joinRoom = () => {
    if (!id || !userName) {
      toast.error("Room id and username is required");
      return;
    }

    // redirect to new route
    if (Password === "HriHarRam1234") {
      navigate(`/editor/${id}`, {
        state: {
          userName,
        },
      });
    } else {
      toast.error(
        "This is in development and accessible only for some authorizes person"
      );
    }
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") joinRoom();
  };

  const createNewRoom = (e) => {
    e.preventDefault();
    var id = Math.random().toString(16).slice(2) + new Date().getTime();
    setId(id);
    toast.success("Created new room");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(/assests/signup-logo.png)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[500]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <CodeIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Join Room
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Room ID"
                onChange={(e) => setId(e.target.value)}
                value={id}
                onKeyUp={handleInputEnter}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Name"
                type="text"
                onChange={(e) => setuserName(e.target.value)}
                value={userName}
                onKeyUp={handleInputEnter}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                value={Password}
                onKeyUp={handleInputEnter}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={joinRoom}
              >
                Join
              </Button>
              <Grid container>
                <Grid item xs>
                  Don't have any invite ? &nbsp;
                  <Link href="/" variant="body2" onClick={createNewRoom}>
                    Create One
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
