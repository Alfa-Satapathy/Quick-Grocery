import axios from "axios";

const API_URL = "https://task-manager-frontend2-whmj.onrender.com"; // Your backend URL

export const getTasks = async (searchQuery = "", page = 1, limit = 5) => {
  try {
    const response = await axios.get(API_URL, {
      params: { search: searchQuery, page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const addTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
