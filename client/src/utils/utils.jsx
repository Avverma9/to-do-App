import axios from "axios";
import { toast } from "react-toastify";
const token = localStorage.getItem("token");

const baseUrl = "http://localhost:4000";

const getAllToDo = (setToDo) => {
  axios
    .get(`${baseUrl}/gettodo`, {
      headers: {
        authorization: `${token}`,
      },
    })
    .then(({ data }) => {
      console.log("data ---> ", data.data);
      setToDo(data.data);
    });
};

const addToDo = (text, setText, setToDo) => {
  axios
    .post(
      `${baseUrl}/save`,
      { text },
      {
        headers: {
          authorization: `${token}`,
        },
      }
    )
    .then((data) => {
      console.log(data);
      toast.success("Task added successfully");
      setText("");
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating) => {
  axios
    .put(
      `${baseUrl}/update`,
      { toDoId, text },
      {
        headers: {
          authorization: `${token}`,
        },
      }
    )
    .then((data) => {
      toast.success("Task updated successfully");
      setText("");
      setIsUpdating(false);
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

const deleteToDo = (_id, setToDo) => {
  console.log('deltetodo')
  axios
    .post(
      `${baseUrl}/delete`,
      { _id },
      {
        headers: {
          authorization: `${token}`,
        },
      }
    )
    .then((data) => {
      console.log(data);
      toast.success("Task deleted successfully");

      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

export { getAllToDo, updateToDo, addToDo, deleteToDo };
