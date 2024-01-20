import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Button,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";

import { tokens } from "../../theme";

import Header from "../../components/Header";

import api from "../../api";

const EditVoucher = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const token = localStorage.getItem("token");

  const colors = tokens("light");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [voucherImage, setVoucherImage] = useState([]);

  const [values, setValues] = useState({
    voucherTitle: "",
    voucherType: "",
    voucherDescription: "",
    voucherPoint: 0,
  });

  const handleFileChange = (e) => {
    setVoucherImage(e.target.files[0]);

    console.log(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tambahkan logika penyimpanan di sini
    console.log("Voucher Updated");

    const formData = new FormData();
    formData.append("voucherImage", voucherImage);
    formData.append("voucherTitle", values.voucherTitle);
    formData.append("voucherType", values.voucherType);
    formData.append("voucherDescription", values.voucherDescription);
    formData.append("voucherPoint", values.voucherPoint);

    await api
      .patch(`/vouchers/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);

        navigate("/managevoucher");
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

  const getVoucherById = async () => {
    await api
      .get(`/vouchers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        const { data } = res.data;

        setValues({
          voucherTitle: data.voucherTitle,
          voucherType: data.voucherType,
          voucherPoint: data.voucherPoint,
          voucherDescription: data.voucherDescription,
          discount: data.discount,
        });
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  useEffect(() => {
    getLoggedIn();
    getVoucherById();
  }, []);

  return isLoggedIn ? (
    <Box m="20px">
      <Header title="ADD VOUCHER" subtitle="Managing Groovy's Vouchers" />
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
        <form onSubmit={handleSubmit}>
          <div className="ImageUploadBox">
            <h2>Upload Image</h2>
            <input
              onChange={handleFileChange}
              name="voucherImage"
              type="file"
            />
          </div>
          <TextField
            label="Voucher Title"
            value={values.voucherTitle}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                margin: "20px 0",
              }}
            >
              <Box sx={{ position: "relative" }}>
                <InputLabel>Voucher Type</InputLabel>
                <Select
                  label="Voucher Type"
                  value={values.voucherType}
                  fullWidth
                  onChange={handleChange}
                  sx={{ width: "200px" }}
                >
                  <MenuItem value="" selected>
                    Choose a type
                  </MenuItem>
                  <MenuItem value="Food">Food</MenuItem>
                  <MenuItem value="Token">Token</MenuItem>
                  <MenuItem value="Pulsa">Pulsa</MenuItem>
                </Select>
              </Box>
            </Box>
          </FormControl>
          <TextField
            label="Voucher Point"
            value={values.voucherPoint}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Voucher Description"
            value={values.voucherDescription}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <Button type="submit" variant="contained">
            Save
          </Button>
        </form>
      </Box>
    </Box>
  ) : (
    navigate("/login")
  );
};

export default EditVoucher;
