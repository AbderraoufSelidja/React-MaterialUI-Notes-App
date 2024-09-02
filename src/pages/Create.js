import React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import ButtonGroup from '@mui/material/ButtonGroup';
import Container from "@mui/material/Container";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TextField from "@mui/material/TextField";
import { useState, useContext } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { appContext } from "../App";
import { useNavigate } from "react-router-dom";

const StyledTextField = styled(TextField)({
  marginTop: 20,
  marginBottom: 20,
});
const StyledFormControl = styled(FormControl)({
  marginTop: 20,
  marginBottom: 20,
  display: "block",
});
export default function Create() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("todos");
  const { notes, setNotes } = useContext(appContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);
    if (title === "") {
      setTitleError(true);
    }
    if (details === "") {
      setDetailsError(true);
    }
    if (title !== "" && details !== "") {
      addNoteToArray(title, details, category);
    }
  };
  function addNoteToArray(title, details, category) {
    // newNote Data
    const newNote = {
      id: notes.length === 0 ? 1 : notes[notes.length - 1].id + 1,
      title: title,
      details: details,
      category: category,
    };
    // Push Note To Array Of Notes
    const nouvelleNote = [...notes, newNote];
    setNotes(nouvelleNote);
    // Add Tasks To Local Storage
    localStorage.setItem("notes", JSON.stringify(nouvelleNote));
    navigate("/");
  }
  return (
    <Container>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        color="textSecondary"
      >
        Create a New Note
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <StyledTextField
          onChange={(e) => setTitle(e.target.value)}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <StyledTextField
          onChange={(e) => {
            setDetails(e.target.value);
          }}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />
        <StyledFormControl>
          <FormLabel color="secondary">Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel
              value="money"
              control={<Radio color="secondary" />}
              label="Money"
            />
            <FormControlLabel
              value="todos"
              control={<Radio color="secondary" />}
              label="Todos"
            />
            <FormControlLabel
              value="reminders"
              control={<Radio color="secondary" />}
              label="Reminders"
            />
            <FormControlLabel
              value="work"
              control={<Radio color="secondary" />}
              label="Work"
            />
          </RadioGroup>
        </StyledFormControl>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          disableElevation
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
