import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

function createData(id, date, name, env, room_id, totalMember) {
  return { id, date, name, env, room_id, totalMember };
}

const rows = [
  createData(0, "16 Feb, 2024", "Crowd Funding", "Development", "2345de3", 14),
  createData(1, "16 Feb, 2024", "CodeFlow", "Development", "43e7y56", 8),
  createData(2, "16 Feb, 2024", "Custom Room", "Coding", "34f765d", 10),
  createData(3, "16 Feb, 2024", "Codechef Solutions", "Coding", "3e5f877", 6),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Rooms() {
  return (
    <React.Fragment>
      <Title>Recent Activity</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Env</TableCell>
            <TableCell>Room ID</TableCell>
            <TableCell align="right">Total Member</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.env}</TableCell>
              <TableCell>{row.room_id}</TableCell>
              <TableCell align="right">{row.totalMember}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more activity
      </Link>
    </React.Fragment>
  );
}
