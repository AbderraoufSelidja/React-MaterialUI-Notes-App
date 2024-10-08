import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Notes from "./pages/Notes";
import Create from "./pages/Create";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { useState, useEffect, createContext } from "react";
import Layout from "./components/Layout";

const theme = createTheme(
  {
  palette: {
    secondary: {
      main: purple[500],
    },
    primary: {
      main: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
}
);
export const appContext = createContext();
function App() {
  const [notes, setNotes] = useState([
    {
      title: "Buy Groceries",
      details:
        "Make a list of items needed for the week and go shopping on Saturday. Include essentials like fruits, vegetables, dairy, and proteins. Check for any items that need to be restocked in the pantry. Consider meal planning for the week to avoid unnecessary purchases and waste.",
      category: "todos",
      id: 0,
    },
    {
      title: "Dentist Appointment",
      details:
        "Remember to visit the dentist on Tuesday at 3 PM.",
      category: "reminders",
      id: 1,
    },
    {
      title: "Monthly Budget Review",
      details:
        "Review and adjust the budget for the month. Check expenses and savings.",
      category: "money",
      id: 2,
    },
    {
      title: "Project Deadline",
      details:
        "Submit the final report for the marketing project by Friday.",
      category: "work",
      id: 3,
    },
    {
      title: "Team Building Activity  ",
      details:
        "Organize a team-building activity for Friday afternoon. Research potential venues and activities, such as an escape room or a cooking class. Prepare a budget and send out a survey to team members for their preferences. Ensure to finalize the booking by Wednesday.",
      category: "todo",
      id: 4,
    },
    {
      title: "Team Building Activity",
      details:
        "Start saving for the upcoming family vacation planned for next summer. Set a goal of $2000 and create a savings plan. Consider cutting back on dining out and entertainment expenses to reach this target. Open a separate savings account for this purpose to track progress easily.",
      category: "money",
      id: 5,
    },
  ]);
  const handleDelete = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
    // console.log(notes);
    console.log(newNotes);
  };
  useEffect(() => {
    if (!window.localStorage.getItem("notes")) {
      localStorage.setItem("notes", JSON.stringify(notes));
    } else {
      setNotes(JSON.parse(window.localStorage.getItem("notes")));
    }
  }, []);
  return (
    <appContext.Provider value={{ notes, setNotes, handleDelete }}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/React-MaterialUI-Notes-App/" element={<Layout />}>
                <Route index element={<Notes />} />
                <Route path="create" element={<Create />} />
                <Route path="*" element={<div>Error</div>} />
              </Route>
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
    </appContext.Provider>
  );
}

export default App;
