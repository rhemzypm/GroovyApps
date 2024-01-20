import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Box } from "@mui/material";
import { tokens } from "../../theme";

import Header from "../../components/Header";

import api from "../../api";

const ManageVoucher = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const colors = tokens("light");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState([]);

  const columns = [
    {
      field: "voucherTitle",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
      disableColumnMenu: true,
    },
    {
      field: "voucherType",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "voucherDescription",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "voucherPoint",
      headerName: "Point",
      flex: 1,
    },
    {
      field: "validUntilDate",
      headerName: "ValidDate",
      type: "dateTime",
      flex: 1,
      renderCell: ({ row }) => {
        return row.validUntilDate
          ? new Date(row.validUntilDate).toLocaleDateString()
          : "";
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
              to={`/editvoucher/${row._id}`}
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
    // Menghapus promo
    await api
      .delete(`/vouchers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        getAllVouchers();
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  const getLoggedIn = () => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/login");
    }
  };

  const getAllVouchers = async () => {
    // Mengambil data voucher dari server
    await api
      .get("/vouchers/", { headers: { Authorization: `Bearer ${token}` } })
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
    getAllVouchers();
  }, [navigate]);

  return isLoggedIn ? (
    <Box m="20px">
      <Header title="MANAGE VOUCHER" subtitle="Manage Voucher for Groovy" />

      <Box m="20px 0 0 0" display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={"/addvoucher"}
        >
          Add Voucher
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

export default ManageVoucher;
