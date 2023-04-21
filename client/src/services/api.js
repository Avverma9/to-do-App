import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getTodos = async () => {
  const response = await axios.get(`${API_URL}/todos`);
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await axios.post(`${API_URL}/todos`, todo);
  return response.data;
};

export const updateTodo = async (id, todo) => {
  const response = await axios.put(`${API_URL}/todos/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/todos/${id}`);
  return response.data;
};
