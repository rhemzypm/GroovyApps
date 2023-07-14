import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  useTheme,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  TextField,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { tokens } from "../../theme";

import Header from "../../components/Header";

import api from "../../api";

const FAQ = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [faqs, setFaqs] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleAdd = async () => {
    const newFaq = {
      id: faqs._id,
      faqTitle: "",
      faqContent: "",
      editMode: true,
      disabled: false,
    };

    setIsUpdated(false);
    setFaqs([...faqs, newFaq]);
  };

  const handleEdit = (id) => {
    const updatedFaqs = faqs.map((faq) =>
      faq._id === id ? { ...faq, editMode: true } : faq
    );
    setFaqs(updatedFaqs);

    setIsUpdated(true);
  };

  const handleSave = async (id, editedTitle, editedContent) => {
    // add faq
    if (!isUpdated) {
      await api
        .post(
          `/faqs/`,
          { faqTitle: editedTitle, faqContent: editedContent },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          console.log(res.data);
          getAllFaqs();
        });
    }

    if (isUpdated) {
      // edit faq
      await api
        .patch(
          `/faqs/${id}`,
          { faqTitle: editedTitle, faqContent: editedContent },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          console.log(res.data);
          getAllFaqs();
        });
    }
  };

  const handleDelete = async (id) => {
    await api
      .delete(`/faqs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        getAllFaqs();

        // const updatedFaqs = faqs.filter((faq) => faq._id !== id);
        // setFaqs(updatedFaqs);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  const handleToggleDisable = async (id) => {
    // disabling the faq
    if (!isDisabled) {
      await api
        .patch(
          `/faqs/${id}/disabled`,
          { isDisabled: true },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log(res.data);
          // Refresh the content list

          setIsDisabled(isDisabled);

          getAllFaqs();
        })
        .catch((err) => {
          console.log(err, err.message);
        });
    }

    // enabling the faq
    // if (isDisabled) {
    //   await api
    //     .patch(
    //       `/faqs/${id}/enabled`,
    //       { isDisabled: false },
    //       {
    //         headers: { Authorization: `Bearer ${token}` },
    //       }
    //     )
    //     .then((res) => {
    //       console.log(res.data);
    //       // Refresh the content list

    //       setIsDisabled(!isDisabled);
    //       getAllFaqs();
    //     })
    //     .catch((err) => {
    //       console.log(err, err.message);
    //     });
    // }
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

  const getAllFaqs = async () => {
    await api
      .get("/faqs/", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res.data);
        setFaqs(res.data.data);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  useEffect(() => {
    getLoggedIn();
    getAllFaqs();
  }, [navigate]);

  return isLoggedIn ? (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      {faqs.map((faq) => (
        <FAQSection
          key={faq._id}
          faq={faq}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handleDelete={handleDelete}
          handleToggleDisable={handleToggleDisable}
        />
      ))}

      <IconButton onClick={handleAdd}>
        <AddIcon />
      </IconButton>
    </Box>
  ) : (
    navigate("/login")
  );
};

const FAQSection = ({
  faq,
  handleEdit,
  handleSave,
  handleDelete,
  handleToggleDisable,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [editedTitle, setEditedTitle] = useState(faq.faqTitle);
  const [editedContent, setEditedContent] = useState(faq.faqContent);

  const handleEditClick = () => {
    handleEdit(faq._id);
  };

  const handleSaveClick = () => {
    handleSave(faq._id, editedTitle, editedContent);
  };

  const handleDeleteClick = () => {
    handleDelete(faq._id);
  };

  const handleToggleDisableClick = () => {
    handleToggleDisable(faq._id);
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ display: "flex", alignItems: "center" }}
      >
        {faq.editMode ? (
          <TextField
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            variant="outlined"
            fullWidth
          />
        ) : (
          <Typography
            color={colors.greenAccent[500]}
            variant="h5"
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              textDecoration: faq.isDisabled ? "line-through" : "none",
            }}
          >
            {faq.faqTitle}
          </Typography>
        )}
        {!faq.editMode && (
          <>
            <IconButton onClick={handleToggleDisableClick}>
              {faq.isDisabled ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
          </>
        )}
        {faq.editMode && (
          <IconButton onClick={handleSaveClick}>
            <SaveIcon />
          </IconButton>
        )}
      </AccordionSummary>

      <Divider />

      <AccordionDetails>
        {faq.editMode ? (
          <TextField
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
          />
        ) : (
          <Typography
            sx={{
              textDecoration: faq.isDisabled ? "line-through" : "none",
            }}
          >
            {faq.faqContent}
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default FAQ;
