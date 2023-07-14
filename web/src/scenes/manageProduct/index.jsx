import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

import { tokens } from "../../theme";

import Header from "../../components/Header";

import api from "../../api";

const ManageProduct = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const colors = tokens("light"); // Menggunakan tema warna "light" dari tokens

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState([]);

  const columns = [
    {
      field: "packageName",
      headerName: "Product",
      flex: 1,
      cellClassName: "name-column--cell",
      disableColumnMenu: true,
    },
    {
      field: "packagePrice",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "packageType",
      headerName: "Type",
      flex: 1,
      renderCell: ({ row: { packageType } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              packageType === "Monthly"
                ? colors.greenAccent[600]
                : packageType === "Yearly"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {packageType === "Yearly" && <AdminPanelSettingsOutlinedIcon />}
            {packageType === "Monthly" && <SecurityOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {packageType}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <>
            <Button
              variant="contained"
              color="info"
              sx={{ marginX: "auto" }}
              as={Link}
              to={`/editproduct/${row._id}`}
            >
              Edit
            </Button>

            <Button
              variant="contained"
              color="error"
              sx={{ marginX: "auto" }}
              onClick={() => handleDelete(row._id)}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const handleDelete = async (id) => {
    await api
      .delete(`/packages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        getAllPackage();
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  // handle get logged in
  const getLoggedIn = () => {
    // memeriksa jika user sudah login
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/login");
    }
  };

  const getAllPackage = async () => {
    await api
      .get("/packages/", {
        headers: { Authorization: `Bearer ${token}` },
      })
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
    getAllPackage();
  }, [navigate]);

  return isLoggedIn ? (
    <Box m="20px">
      <Header
        title="MANAGE PRODUCT"
        subtitle="Managing Groovy's Package Services"
      />
      <Box m="20px 0 0 0" display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          as={Link}
          to={"/addproduct"}
        >
          Add Product
        </Button>
      </Box>
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
        }}
      >
        <DataGrid
          checkboxSelection
          rows={data}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  ) : (
    navigate("/login")
  );
};

export default ManageProduct;
