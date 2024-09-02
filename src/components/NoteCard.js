import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Avatar, CardContent, IconButton, Typography } from "@mui/material";
import {  DeleteOutlined } from "@mui/icons-material";
import { useContext } from "react";
import { appContext } from "../App";
import styled from "styled-components";

export default function NoteCard({ note }) {
    const { handleDelete } = useContext(appContext);
    const StyledCard = styled(Card)({
      border: note.category === 'work' ? "1px solid red" : note.category === 'reminders' ? "1px solid green" : note.category === "money" ? "1px solid blue" : "1px solid Purple",
    })
  return (
    <div>
      <StyledCard elevation={1}>
        <CardHeader
        avatar={
        <Avatar style={{backgroundColor: note.category === 'work' ? "red" : note.category === 'reminders' ? "green" : note.category === "money" ? "blue" : "Purple"}}>
          {note.category[0].toUpperCase()}
        </Avatar>}
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
            <Typography variant="body2" color="textSecondary">
                {note.details}
            </Typography>
        </CardContent>
      </StyledCard>
    </div>
  );
}
