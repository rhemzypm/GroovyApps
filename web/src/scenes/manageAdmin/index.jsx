import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

import Header from "../../components/Header";

// import { mockDataTeam } from "../../data/mockData";
import api from "../../api";

const Admin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState([]);

  const columns = [
    { field: "adminId", headerName: "AdminId" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "emailAddress",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "admin"
                ? colors.greenAccent[600]
                : role === "super-admin"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "super-admin" && <SecurityOutlinedIcon />}
            {/* {role === "user" && <LockOpenOutlinedIcon />} */}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
  ];

  // handle get logged in
  const getLoggedIn = () => {
    // memeriksa jika user sudah login
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/login");
    }
  };

  const getAllAdmins = async () => {
    if (token) {
      await api
        .get("/admins/", {
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
    getAllAdmins();
  }, [navigate]);

  return isLoggedIn ? (
    <Box m="20px">
      <Header title="ADMIN" subtitle="Managing the admin accounts" />
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
            backgroundColor: colors.redAccent[800],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.redAccent[800],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          getRowId={(row) => row._id}
          rows={data}
          columns={columns}
        />
      </Box>
    </Box>
  ) : (
    navigate("/login")
  );
};

export default Admin;
