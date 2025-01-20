import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../api';
import { Button, List, ListItem, ListItemText, IconButton, TextField, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList = ({ onEdit }) => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState(""); // State to hold the search query

  // Fetch tasks with optional search filter
  const fetchTasks = async () => {
    try {
      const data = await getTasks(search); // Pass the search term to the API
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Handle task deletion
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks(); // Refresh the task list after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Effect to fetch tasks when the search term changes
  useEffect(() => {
    fetchTasks();
  }, [search]);

  return (
    <Box>
      {/* Search bar */}
      <TextField
        label="Search by Title"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)} // Update search term
        fullWidth
        style={{ marginBottom: '20px' }}
      />

      <Typography variant="h5" gutterBottom>
        Task List
      </Typography>

      {/* Task list */}
      <List>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <ListItem
              key={task._id}
              secondaryAction={
                <>
                  <IconButton onClick={() => onEdit(task)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(task._id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText primary={task.title} secondary={task.description} />
            </ListItem>
          ))
        ) : (
          <Typography>No tasks found</Typography>
        )}
      </List>
    </Box>
  );
};

export default TaskList;
