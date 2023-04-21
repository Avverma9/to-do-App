import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";

const ToDo = ({ text, updateMode,deleteToDo }) => {

  return (
    <div className="todos-todo">
      <div className="text">{text}</div>
      <div className="icons">
        <AiFillDelete onClick={deleteToDo} className="icon" />
        <BiEdit className="icon" onClick={updateMode} />
      </div>
    </div>
  );
};

export default ToDo;
