import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import PaymentIcon from "@mui/icons-material/Payment";

import Header from "../../components/Header";

import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";

import api from "../../api";

const Users = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState([]);

  const columns = [
    { field: "userId", headerName: "UserId", flex: 0.5 },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "emailAddress",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "nomorHP",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "balance",
      headerName: "Balance",
      flex: 1,
    },
    {
      field: "point",
      headerName: "Point",
      flex: 1,
    },
    {
      field: "paymentStatus",
      headerName: "Payment",
      flex: 1,
      renderCell: ({ row: { paymentStatus } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.greenAccent[600]}
            borderRadius="4px"
          >
            {paymentStatus === "process" && <PaymentIcon />}
            {paymentStatus === "done" && <PaymentIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {paymentStatus}
            </Typography>
          </Box>
        );
      },
    },
    // {
    //   field: "role",
    //   headerName: "Role",
    //   flex: 1,
    //   renderCell: ({ row: { role } }) => {
    //     return (
    //       <Box
    //         width="60%"
    //         m="0 auto"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         backgroundColor={colors.greenAccent[600]}
    //         borderRadius="4px"
    //       >
    //         {role === "user" && <LockOpenOutlinedIcon />}
    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
    //           {role}
    //         </Typography>
    //       </Box>
    //     );
    //   },
    // },
  ];

  // handle get logged in
  const getLoggedIn = () => {
    // memeriksa jika user sudah login
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/Login");
    }
  };

  const getAllUsers = async () => {
    if (token) {
      await api
        .get("/users/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);

          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err, err.message);
        });
    }
  };

  useEffect(() => {
    getLoggedIn();
    getAllUsers();
  }, [navigate]);

  return isLoggedIn ? (
    <Box m="20px">
      <Header title="Users" subtitle="List of Users for Future Reference" />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  ) : (
    navigate("/login")
  );
};

export default Users;
