import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import { tokens } from "../../theme";

import Header from "../../components/Header";

import api from "../../api";

const ManagePromo = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const colors = tokens("light"); // Menggunakan tema warna "light" dari tokens

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState([]);

  const columns = [
    {
      field: "promoTitle",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
      disableColumnMenu: true,
    },
    {
      field: "promoContent",
      headerName: "Content",
      flex: 1,
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
              to={`/editpromo/${row._id}`}
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
      .delete(`/promos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        getAllPromos();
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

  const getAllPromos = async () => {
    await api
      .get("/promos/", { headers: { Authorization: `Bearer ${token}` } })
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
    getAllPromos();
  }, [navigate]);

  return isLoggedIn ? (
    <Box m="20px">
      <Header title="MANAGE PROMO" subtitle="Manage Promo for Groovy" />

      <Box m="20px 0 0 0" display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" as={Link} to={"/addpromo"}>
          Add Promo
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

export default ManagePromo;
