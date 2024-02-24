import * as React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import LogoutIcon from "@mui/icons-material/Logout";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import { useDispatch } from "react-redux";
import { removeUser } from "../store/slice/UserSlice";
export default function ListItems({ changeTab, tab }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = (e) => {
    e.preventDefault();
    dispatch(removeUser(false));
    localStorage.removeItem("Cookie");
    localStorage.removeItem("userName");
    toast.success("Log out Successfully");
    navigate("/login");
  };

  return (
    <>
      <ListItemButton
        onClick={() => changeTab("dashboard")}
        sx={tab === "dashboard" ? { backgroundColor: "#ced4da" } : {}}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton
        onClick={() => changeTab("all-rooms")}
        sx={tab === "all-rooms" ? { backgroundColor: "#ced4da" } : {}}
      >
        <ListItemIcon>
          <AddHomeOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Rooms" />
      </ListItemButton>
      <ListItemButton
        onClick={() => changeTab("rooms")}
        sx={tab === "rooms" ? { backgroundColor: "#ced4da" } : {}}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="My Rooms" />
      </ListItemButton>
      <ListItemButton
        onClick={() => changeTab("member")}
        sx={tab === "member" ? { backgroundColor: "#ced4da" } : {}}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Me Member" />
      </ListItemButton>
      <ListItemButton
        onClick={() => changeTab("notifications")}
        sx={tab === "notifications" ? { backgroundColor: "#ced4da" } : {}}
      >
        <ListItemIcon>
          <NotificationsActiveIcon />
        </ListItemIcon>
        <ListItemText primary="Notifications" />
      </ListItemButton>
      <ListItemButton
        onClick={() => changeTab("kanban")}
        sx={tab === "kanban" ? { backgroundColor: "#ced4da" } : {}}
      >
        <ListItemIcon>
          <ViewKanbanIcon />
        </ListItemIcon>
        <ListItemText primary="Kanban" />
      </ListItemButton>
      <ListItemButton
        onClick={logOut}
        // sx={tab === "logout" ? { backgroundColor: "#ced4da" } : {}}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItemButton>
    </>
  );
}
