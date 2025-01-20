import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../api'; // Ensure API functions are correctly implemented
import { Button, List, ListItem, ListItemText, IconButton, TextField, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList = ({ onEdit }) => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 



  const fetchTasks = async (searchQuery = "" , currentPage = 1) => {
    try {
      const data = await getTasks(searchQuery, currentPage , 5);
      setTasks(data.tasks);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks(search, page); 
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  useEffect(() => {
    fetchTasks(search, page); 
  }, [search, page ]);

  return (
    <Box>
      <TextField
        label="Search by Title"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
        fullWidth
        style={{ marginBottom: '20px' }}
      />
      
      <Typography variant="h5" gutterBottom>Task List</Typography>

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
       {/* Pagination Controls */}
       <Box display="flex" justifyContent="space-between" marginTop="20px">
        <Button
          onClick={() => setPage(page > 1 ? page - 1 : 1)} 
          disabled={page === 1}
        >
          Previous
        </Button>
        <Typography>Page {page} of {totalPages}</Typography>
        <Button
          onClick={() => setPage(page < totalPages ? page + 1 : totalPages)} 
          disabled={page === totalPages}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default TaskList;
