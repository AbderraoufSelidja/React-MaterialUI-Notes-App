import React from "react";
import { useContext } from "react";
import { appContext } from "../App";
import Container from "@mui/material/Container";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";
export default function Notes() {
  const { notes } = useContext(appContext);
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }
  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {notes.map((note) => (
          <div>
            <NoteCard note={note}/>
          </div>
        ))}
      </Masonry>
    </Container>
  );
}
