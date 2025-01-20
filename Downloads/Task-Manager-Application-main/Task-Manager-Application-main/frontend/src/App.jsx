import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";

const App = () => {
  const [open, setOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleOpen = (task) => {
    setTaskToEdit(task);
    setOpen(true);
  };

  const handleClose = () => {
    setTaskToEdit(null);
    setOpen(false);
  };

  return (
    <Router>
      <AppBar position="static" style={{ marginBottom: "20px" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            Task Manager
          </Typography>

        
        </Toolbar>
      </AppBar>

      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpen(null)}
                  style={{ marginBottom: "20px" }}
                >
                  Add Task
                </Button>
                <TaskList onEdit={handleOpen} />
                <TaskForm
                  open={open}
                  onClose={handleClose}
                  taskToEdit={taskToEdit}
                  refreshTasks={() => window.location.reload()}
                />
              </>
            }
          />
         
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
