import { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { blue } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector, useDispatch } from "react-redux";
import { deleteAdminUser } from "../store/slice/AdminReq";
import toast from "react-hot-toast";
import axios from "axios";
import BackendAPI from "../hooks/api";
import ACTIONS from "../Actions";
import { useParams } from "react-router-dom";
let userID = [
  { id: "6576787983ed", user: "Hritik" },
  { id: "dse3426y8", user: "Pathak" },
];

function SimpleDialog(props) {
  const { id, env } = useParams();
  const dispatch = useDispatch();
  const { onClose, selectedValue, open, socketRef } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleAddAdmin = async (data) => {
    let newData = JSON.stringify({ newOwner: data.me, prevOwner: data.to });
    let config = {
      method: "post",
      url: `${BackendAPI}/v1/Admin/update/${id}/${env}`,
      headers: {
        Authorization: `Bearer=${JSON.parse(localStorage.getItem("Cookie"))}`,
        "Content-Type": "application/json",
      },
      data: newData,
    };

    await axios
      .request(config)
      .then((response) => {
        socketRef.current.emit(ACTIONS.SEND_DECLINE, {
          userName: data.userName,
          room_id: data.room_id,
          msg: `${data.userName} is now an admin of this room.`,
        });
        socketRef.current.emit(ACTIONS.REFERESH, { room_id: id });
        dispatch(deleteAdminUser({ id: data.id }));
      })
      .catch((error) => {
        toast.error("unknown error occured");
      });
  };

  const handleDelete = (data) => {
    let config = {
      method: "delete",
      url: `${BackendAPI}/v1/Admin/delete/${id}/${env}`,
      headers: {
        Authorization: `Bearer=${JSON.parse(localStorage.getItem("Cookie"))}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .request(config)
      .then((response) => {
        socketRef.current.emit(ACTIONS.SEND_DECLINE, {
          userName: data.userName,
          room_id: data.room_id,
          msg: `Admin decline ${data.userName} request`,
        });
      })
      .catch((error) => {
        toast.error("unknown error occured");
      });

    dispatch(deleteAdminUser({ id: data.id }));
    toast.error(`${data.userName} request decline`);
  };
  const Notify = useSelector((state) => state.admin);
  userID = Notify;

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Request Room </DialogTitle>
      <List sx={{ pt: 0 }}>
        {Notify.map((id) => (
          <ListItem disableGutters key={id.id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={id.userName}
                style={{ paddingRight: "12px" }}
              />
              <IconButton
                aria-label="notification"
                color="succcess"
                onClick={() => handleAddAdmin(id)}
              >
                <CheckIcon size="large" sx={{ width: "100%" }} />
              </IconButton>
              <IconButton
                aria-label="notification"
                color="error"
                onClick={() => handleDelete(id)}
              >
                <ClearIcon size="large" sx={{ width: "100%" }} />
              </IconButton>
              {/* <ListItemText primary={id.id} /> */}
            </ListItem>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo({ socketRef }) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(userID[0]?.me);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <IconButton
        aria-label="notification"
        color="secondary"
        onClick={handleClickOpen}
      >
        <NotificationsIcon size="large" sx={{ width: "100%" }} />
      </IconButton>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        socketRef={socketRef}
      />
    </>
  );
}
