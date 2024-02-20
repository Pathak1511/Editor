import { useEffect, useState, useMemo } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Request({ url, btn, isnotify, setNotificationCounts }) {
  const columns = [
    { id: "date", label: "Date", minWidth: 170 },
    {
      id: "room_name",
      label: "Room Name",
      minWidth: 170,
    },
    {
      id: "environment",
      label: "Environment",
      minWidth: 170,
    },
    {
      id: "room_id",
      label: "Room Id",
      minWidth: 100,
    },
    isnotify === "notifications"
      ? {
          id: "user",
          label: "User",
          minWidth: isnotify === "rooms" ? 0 : 170,
        }
      : {},

    {
      id: "button",
      label: "Join Room",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
  ];

  function createData(data) {
    const button = `<Button>Enter</Button>`;
    return {
      date: new Date(data.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }),
      room_name: data.room_name,
      environment: data.env,
      room_id: data.room_id,
      button,
      password: "1234",
      community: data.id,
      owner: data.owner,
      user: data.me,
    };
  }

  const [rooms, setRooms] = useState([]);

  const fetchData = useMemo(() => {
    return async () => {
      try {
        const cookie = JSON.parse(localStorage.getItem("Cookie"));
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: url,
          headers: {
            Authorization: `Bearer=${cookie}`,
          },
        };

        const response = await axios.request(config);
        const newRoom = response.data.data.map(createData);
        setRooms(newRoom);
        if (isnotify === "notifications") {
          setNotificationCounts(newRoom.length);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sendNodification = (community, to) => {
    const cookie = JSON.parse(localStorage.getItem("Cookie"));
    axios
      .post(
        "https://codeflow-3ir4.onrender.com/v1/Notification/send-notification",
        {
          to: to,
          community: community,
        },
        {
          headers: { Authorization: `Bearer=${cookie}` },
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        fetchData();
      })
      .catch((error) => {
        toast.success(error.response.data.message);
        // console.log(error.response.data.message);
      });
  };

  const acceptInvite = (data) => {
    axios
      .post(
        "https://codeflow-3ir4.onrender.com/v1/Notification/accept-notifications",
        data
      )
      .then(
        (response) => console.log(response.data),
        toast.success("Invite accepted successfully"),
        fetchData()
      )
      .catch((error) => console.log(error));
  };

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "#171717",
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
        width: "100%",
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 16 }}>
        <Grid>
          {/* Recent Activity */}
          <Grid item xs={12}>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead style={{ backgroundColor: "#282828" }}>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rooms
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.room_id + row.environment}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format &&
                                  typeof value === "number" ? (
                                    column.format(value)
                                  ) : column.format &&
                                    value === "<Button>Enter</Button>" ? (
                                    <Button
                                      size="small"
                                      color="primary"
                                      variant="contained"
                                      onClick={() =>
                                        isnotify === "notifications"
                                          ? acceptInvite(row)
                                          : sendNodification(
                                              row.community,
                                              row.owner
                                            )
                                      }
                                    >
                                      {btn}
                                    </Button>
                                  ) : (
                                    value
                                  )}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rooms.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
