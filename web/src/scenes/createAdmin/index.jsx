import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import Header from "../../components/Header";

import api from "../../api";

const Form = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const [name, setName] = useState("");

  const handleFormSubmit = async (values) => {
    // const fullName = `${values.firstName} ${values.lastName}`;
    // setName(fullName);

    // console.log(name);

    console.log(values);

    await api
      .post(
        "/admins/",
        {
          name: values.name,
          emailAddress: values.emailAddress,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res.data);
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
      navigate("/Login");
    }
  };

  useEffect(() => {
    getLoggedIn();
  }, [navigate]);

  return isLoggedIn ? (
    <Box m="20px">
      <Header title="CREATE ADMIN" subtitle="Create a New Admin Account" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.emailAddress}
                name="emailAddress"
                error={!!touched.emailAddress && !!errors.emailAddress}
                helperText={touched.emailAddress && errors.emailAddress}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Admin
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  ) : (
    navigate("/login")
  );
};

const checkoutSchema = yup.object().shape({
  // firstName: yup.string().required("required"),
  // lastName: yup.string().required("required"),
  name: yup.string().required("required"),
  emailAddress: yup.string().email("invalid email").required("required"),
});

const initialValues = {
  // firstName: "",
  // lastName: "",
  name: "",
  emailAddress: "",
};

export default Form;
