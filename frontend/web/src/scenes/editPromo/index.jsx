import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Button, TextField } from "@mui/material";

import { tokens } from "../../theme";

import Header from "../../components/Header";

import api from "../../api";

const EditPromo = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem("token");

  const colors = tokens("light");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [promoImage, setPromoImage] = useState([]);

  const [values, setValues] = useState({
    promoTitle: "",
    promoContent: "",
  });

  const handleFileChange = (e) => {
    setPromoImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tambahkan logika penyimpanan di sini
    console.log("Promo Updated");

    const formData = new FormData();
    formData.append("promoImage", promoImage);
    formData.append("promoTitle", values.promoTitle);
    formData.append("promoContent", values.promoContent);

    await api
      .patch(`/promos/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);

        navigate("/managepromo");
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

  const getPromoById = async () => {
    await api
      .get(`/promos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        const { data } = res.data;

        setValues({
          promoTitle: data.promoTitle,
          promoContent: data.promoContent,
        });
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  useEffect(() => {
    getLoggedIn();
    getPromoById();
  }, [navigate]);

  return isLoggedIn ? (
    <Box m="20px">
      <Header title="ADD PROMO" subtitle="Managing Groovy's Promotions" />
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
            <input onChange={handleFileChange} name="promoImage" type="file" />
          </div>
          <TextField
            label="Promo Title"
            name="promoTitle"
            value={values.promoTitle}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Promo Content"
            name="promoContent"
            value={values.promoContent}
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

export default EditPromo;
