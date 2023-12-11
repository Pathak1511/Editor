import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";

import List from "@mui/material/List";

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const ListItems = ({ handleRoomClick }) => {
  console.log(handleRoomClick);
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItemButton disabled onClick={() => handleRoomClick()}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Rooms" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Members" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          {/* <Brightness4Icon /> */}
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </ListItemIcon>
        <ListItemText primary="Notifications" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Log out" />
      </ListItemButton>
    </List>
  );
};

export default ListItems;

// export const mainListItems = (
//   <React.Fragment>
//     <ListItemButton>
//       <ListItemIcon>
//         <DashboardIcon />
//       </ListItemIcon>
//       <ListItemText primary="Rooms" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <PeopleIcon />
//       </ListItemIcon>
//       <ListItemText primary="Members" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AccountCircleIcon />
//       </ListItemIcon>
//       <ListItemText primary="Profile" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <LogoutIcon />
//       </ListItemIcon>
//       <ListItemText primary="Log out" />
//     </ListItemButton>
//   </React.Fragment>
// );
