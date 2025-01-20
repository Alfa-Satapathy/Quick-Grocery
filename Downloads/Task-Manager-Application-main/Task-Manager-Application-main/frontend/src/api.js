import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks"; // Your backend URL

// Fetch tasks with pagination and optional search
export const getTasks = async (searchQuery = "", page = 1, limit = 10) => {
  try {
    // Make a GET request to fetch tasks with the search query, page, and limit
    const response = await axios.get(API_URL, {
      params: { search: searchQuery, page, limit },
    });
    return response.data; // Return the tasks and totalPages from the response
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Add a new task
export const addTask = async (task) => {
  try {
    const response = await axios.post(API_URL, task);
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

// Update a task
export const updateTask = async (id, task) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, task);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
