import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits({ light }) {
  console.log(light);
  return (
    <React.Fragment>
      <Avatar sx={{ bgcolor: light === "light" ? "#222" : "#f8f8f8" }}>
        H
      </Avatar>
      <Typography component="p" variant="h5">
        Hritik Pathak
      </Typography>
      <Typography component="p" variant="h8">
        Room owned : 5
      </Typography>
      <Typography component="p" variant="h8">
        Member : 2
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2023
      </Typography>
      <div>
        <Button color="primary" href="#" onClick={preventDefault}>
          View All Rooms
        </Button>
      </div>
    </React.Fragment>
  );
}
