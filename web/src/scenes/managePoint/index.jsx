import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography, TextField, Button, useTheme } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import { DataGrid } from "@mui/x-data-grid";

import { tokens } from "../../theme";

import Header from "../../components/Header";

import PointConfirm from "../../components/PointConfirm";

import api from "../../api";

const ManagePoint = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);

  const [inputError, setInputError] = useState(false);

  const [data, setData] = useState([]);

  const [previousPoint, setPreviousPoint] = useState(0);
  const [currentPoint, setCurrentPoint] = useState(0);
  const [changedPoint, setChangedPoint] = useState(0);

  const columns = [
    {
      field: "point",
      headerName: "Point",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.point} GP
        </Typography>
      ),
    },
    {
      field: "balance",
      headerName: "Balance",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          Rp. {params.row.balance}
        </Typography>
      ),
    },
    {
      field: "currencyPoint",
      headerName: "Currency Point",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "currencyBalance",
      headerName: "Currency Balance",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "user.firstName",
    //   headerName: "User",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
  ];

  const handleInputChange = (event) => {
    setChangedPoint(event.target.value);
  };

  const handleSavePoint = () => {
    setConfirmationOpen(true);
  };

  const handleConfirmSave = async () => {
    await api
      .post(
        "/points/convert",
        { changedPoint: changedPoint },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res.data);

        getAllUsersPoints();

        setCurrentPoint(changedPoint);
        setPreviousPoint(currentPoint);
        setChangedPoint(0);
        setInputError(false);
        setConfirmationOpen(false);
      })
      .catch((err) => {
        console.log(err, err.message);

        // if (err.error.status === 1) {
        //   if (!/^[0-9,]+$/.test(changedPoint)) {
        //     setInputError(true);
        //     return;
        //   }
        // }
      });
  };

  const handleCancelSave = () => {
    setConfirmationOpen(false);
  };

  const handleRestore = () => {
    setCurrentPoint(previousPoint);
    setPreviousPoint(currentPoint);
  };

  // handle get logged in
  const getLoggedIn = () => {
    // memeriksa jika user sudah login
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/Login");
    }
  };

  const getAllUsersPoints = async () => {
    await api
      .get("/points/", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res.data);

        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  useEffect(() => {
    getLoggedIn();
    getAllUsersPoints();
  }, [navigate]);

  return isLoggedIn ? (
    <Box m="20px">
      <Header title="POINTS" subtitle="List of Point Balances" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {/* Three-column space */}
        <Box display="flex" gap="20px" marginBottom="20px">
          <Box flex="1">
            <Box
              sx={{
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? colors.grey[800]
                    : colors.grey[200]
                }`,
                borderColor: "primary.main",
                borderRadius: "7px",
                padding: "10px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="subtitle1">Previous Point:</Typography>
              <Typography>{`Rp ${previousPoint} = 1 groovy point`}</Typography>
              <Button
                variant="contained"
                sx={{ marginTop: "auto", marginLeft: "auto" }}
                onClick={handleRestore}
              >
                Restore
              </Button>
            </Box>
          </Box>
          <Box flex="1">
            <Box
              sx={{
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? colors.grey[800]
                    : colors.grey[200]
                }`,
                borderColor: "primary.main",
                borderRadius: "7px",
                padding: "10px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="subtitle1">Current Point:</Typography>
              <Typography>{`Rp ${currentPoint} = 1 groovy point`}</Typography>
            </Box>
          </Box>
          <Box flex="1">
            <Box
              sx={{
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? colors.grey[800]
                    : colors.grey[200]
                }`,
                borderColor: "primary.main",
                borderRadius: "7px",
                padding: "10px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="subtitle1">Change Point:</Typography>
              <Box
                display="flex"
                alignItems="center"
                gap="20px"
                marginBottom="20px"
              >
                <Typography>Rp </Typography>
                <TextField
                  variant="outlined"
                  value={changedPoint}
                  onChange={handleInputChange}
                  // sx={{ width: "150px" }}
                />
                <Typography>= 1 groovy point</Typography>
              </Box>
              {inputError && (
                <Box>
                  <Typography color="red" variant="caption">
                    Invalid input. Only numbers and commas are allowed.
                  </Typography>
                </Box>
              )}
              <Box marginLeft="auto" marginTop="auto">
                <Button
                  variant="contained"
                  sx={{ backgroundColor: colors.primary[500] }}
                  onClick={handleSavePoint}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        <DataGrid
          checkboxSelection
          getRowId={(row) => row._id}
          rows={data}
          columns={columns}
        />
        <PointConfirm
          open={isConfirmationOpen}
          onClose={handleCancelSave}
          onConfirm={handleConfirmSave}
        />
      </Box>
    </Box>
  ) : (
    navigate("/login")
  );
};

export default ManagePoint;
