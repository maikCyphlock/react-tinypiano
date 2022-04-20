import React from "react";
import styled from "styled-components";

type Props = {
  color: string;
  note: string;
  clickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  
};
const Black = styled.button`
  width: 40px;
  height: 130px;
  background-color: black;
  margin: -4.35rem -1rem 0;
  border-radius:0 0 9px 9px;
  
  z-index: 1;
`;

const White = styled.button`
  background-color: white;
  width: 60px;
  height: 200px;
  border-radius: 9px;
  margin: -0.3rem;
`;

const Note: React.FC<Props> = ({
  color,
  note,
  clickHandler,
  
}) =>
  color === "white" ? (
    <White
      value={note}
      key={note}
      id={note}
      onClick={clickHandler}
      
    ></White>
  ) : (
    <Black
      value={note}
      key={note}
      id={note}
      onClick={clickHandler}
     
    ></Black>
  );

export default Note;
