import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItems from "./ListItems";
import Details from "./Details";
import Rooms from "./Rooms";
import Cards from "./Cards";
import { CustomKanban } from "./CustomKanban";
import FuzzyOverlayError from "./Error";
import RoomList from "./RoomList";
import Request from "./Request";
import BackendAPI from "../hooks/api";
import { Navigate } from "react-router-dom";
import Login from "../pages/login";

function Copyright(props) {
  return (
    <Typography variant="body2" color="#f8f8f8" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/pathak1511">
        Admin
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("dashboard");
  const [notificationCount, setNotificationCount] = useState(0);
  const [user, setuser] = useState(
    localStorage.getItem("isAuthorized") || false
  );
  const setNotificationCounts = (value) => {
    setNotificationCount(value);
  };

  const changeTab = (value) => {
    setTab(value);
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };

  if (!user) {
    return <Login />;
  } else {
    return (
      <>
        <Box sx={{ display: "flex" }}>
          {/* <CssBaseline /> */}
          <AppBar
            position="absolute"
            open={open}
            sx={{ backgroundColor: "#171717" }}
          >
            <Toolbar
              sx={{
                pr: "32px",
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <img
                src="/assests/main-logo.png"
                alt="Logo"
                height="50"
                width="50"
              />
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{
                  flexGrow: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                CodeFlow Studio
              </Typography>
              <IconButton
                color="inherit"
                onClick={() => changeTab("notifications")}
              >
                <Badge badgeContent={notificationCount} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            open={open}
            sx={{ backgroundColor: "#171717" }}
          >
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <ListItems changeTab={changeTab} tab={tab} setuser={setuser} />
            </List>
          </Drawer>
          {/*  The main content */}
          {tab === "dashboard" ? (
            <Box
              component="main"
              sx={{
                backgroundColor: "#171717",
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
              }}
            >
              <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  {/* Cards */}
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper
                      className="cards"
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        height: 240,
                      }}
                    >
                      <Cards image="/assests/3.png" title="development" />
                      <Cards image="/assests/4.png" title="coding" />
                    </Paper>
                  </Grid>
                  {/* Details */}
                  <Grid item xs={12} md={4} lg={3}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 240,
                      }}
                    >
                      <Details />
                    </Paper>
                  </Grid>
                  {/* Recent Activity */}
                  <Grid item xs={12}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        overflow: "auto",
                      }}
                    >
                      <Rooms />
                    </Paper>
                  </Grid>
                </Grid>
                <Copyright sx={{ pt: 4 }} />
              </Container>
            </Box>
          ) : tab === "kanban" ? (
            <CustomKanban />
          ) : tab === "rooms" ? (
            <>
              <RoomList
                url={`${BackendAPI}/v1/room/me/owner`}
                btn="Enter"
                url2={`${BackendAPI}/v1/room/delete-community`}
              />
            </>
          ) : tab === "member" ? (
            <>
              <RoomList
                url={`${BackendAPI}/v1/room/me/member`}
                btn="Enter"
                url2={`${BackendAPI}/v1/member/delete-member`}
              />
            </>
          ) : tab === "all-rooms" ? (
            // http://localhost:5500/v1/room/all-community
            <>
              <Request
                url={`${BackendAPI}/v1/room/all-community`}
                btn="Send Request"
                isnotify="rooms"
              />
            </>
          ) : tab === "notifications" ? (
            //http://localhost:5500/v1/Notification/get-notification
            <>
              <Request
                url={`${BackendAPI}/v1/Notification/get-notification`}
                btn="Accept"
                isnotify="notifications"
                setNotificationCounts={setNotificationCounts}
              />
            </>
          ) : (
            <>
              <FuzzyOverlayError changeTab={changeTab} />
            </>
          )}
        </Box>
      </>
    );
  }
}
