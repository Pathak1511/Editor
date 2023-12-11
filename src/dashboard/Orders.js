import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const handleDelete = (e) => {
  if (e === "Admin") {
    toast.error("You can't delete Admin");
  } else {
    toast.success("Member deleted successfully");
  }
};

function createData(ID, name, role, date) {
  return { ID, name, role, date };
}

const rows = [
  createData(1, "Frozen yoghurt", "Admin", "22/12/2024"),
  createData(2, "Ice cream sandwich", "Member", "24/12/2024"),
  createData(3, "Eclair", "Member", "23/12/2024"),
  createData(4, "Cupcake", "Admin", "22/12/2024"),
  createData(5, "Gingerbread", "Member", "25/12/2024"),
  createData(6, "Hritik", "Member", "25/12/2024"),
  createData(7, "Gingerbread", "Member", "25/12/2024"),
  createData(8, "Gingerbread", "Member", "25/12/2024"),
];

export default function Orders() {
  return (
    <Paper sx={{ minWidth: 440 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table
          sx={{ minWidth: 300, minHeight: 400 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>ID </StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Role</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.ID}>
                <StyledTableCell component="th" scope="row">
                  {row.ID}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="left">{row.role}</StyledTableCell>
                <StyledTableCell align="left">{row.date}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.role === "Admin" ? (
                    <IconButton disabled>
                      <DeleteIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDelete(row.role)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
