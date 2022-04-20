import React from "react";
import { ReactElement } from "react";
import styled from "styled-components";

import { NoteType } from "../helpers";
import Note from "./Note";

type Props = {
  notes: NoteType[];
  clickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #141313;
  padding: 3rem 1rem 1rem;
  box-shadow: -2px 2px 20px 10px rgb(0 0 0 / 50%);
`;

const Octave: React.FC<Props> = ({
  notes,
  clickHandler,
  
}): ReactElement => {
  return (
    <Wrapper>
      {notes.map((element: NoteType, index) => (
        <Note
            key={index}
          color={element.color}
          note={element.note}
          clickHandler={clickHandler}
        />
      ))}
    </Wrapper>
  );
};

export default Octave;
