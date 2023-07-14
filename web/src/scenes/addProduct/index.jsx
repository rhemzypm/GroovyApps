import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

import { tokens } from "../../theme";

import Header from "../../components/Header";

import api from "../../api";

const AddProduct = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const colors = tokens("light");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [packageImage, setPackageImage] = useState([]);

  const [values, setValues] = useState({
    packageName: "",
    packagePrice: 0,
    packageDescription: "",
    packageType: "",
  });

  const handleFileChange = (e) => {
    setPackageImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tambahkan logika penyimpanan di sini
    console.log("Package Added");

    const formData = new FormData();
    formData.append("packageImage", packageImage);
    formData.append("packageName", values.packageName);
    formData.append("packagePrice", values.packagePrice);
    formData.append("packageDescription", values.packageDescription);
    formData.append("packageType", values.packageType);

    await api
      .post("/packages/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);

        navigate("/manageProduct");
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

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

  useEffect(() => {
    getLoggedIn();
  }, []);

  return isLoggedIn ? (
    <Box m="20px">
      <Header
        title="ADD PRODUCT"
        subtitle="Managing Groovy's Package Services"
      />
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
              name="packageImage"
              type="file"
            />
          </div>
          <TextField
            label="Package Name"
            name="packageName"
            value={values.packageName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Package Price"
            name="packagePrice"
            value={values.packagePrice}
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
                <InputLabel>Package Type</InputLabel>
                <Select
                  label="Package Type"
                  name="packageType"
                  value={values.packageType}
                  onChange={handleChange}
                  sx={{ width: "200px" }}
                >
                  <MenuItem value="Yearly">Yearly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                </Select>
              </Box>
            </Box>
          </FormControl>
          <TextField
            label="Package Description"
            name="packageDescription"
            value={values.packageDescription}
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

export default AddProduct;
