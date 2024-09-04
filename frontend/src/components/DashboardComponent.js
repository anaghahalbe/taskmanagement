import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService'; // Adjust the path as needed

const DashboardComponent = () => {
  const [activeView, setActiveView] = useState("form");
  const [taskName, setTaskName] = useState("");
  const [taskNameError, setTaskNameError] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date()); // State for selected end date
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    console.log("Fetching tasks from:", "http://localhost:8080/api/tasks"); // Log before fetching
    fetch("http://localhost:8080/api/tasks")
      .then((response) => {
        console.log("Response:", response); // Log the entire response object
        return response.json();
      })
      .then((data) => {
        console.log("Data received from API:", data); // Log data before updating state
        setTasks(data);
        console.log("Tasks state updated:", tasks); // Log tasks state after update (might not reflect immediately due to async nature)
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, [tasks]);

  const handleNavClick = (view) => {
    setActiveView(view);
  };
  const handleTaskNameChange = (event) => {
    const value = event.target.value;
    setTaskName(value);

    if (!/^[A-Za-z]+$/.test(value)) {
      setTaskNameError(
        "Task name should only contain letters (no spaces or special characters)."
      );
    } else {
      setTaskNameError("");
    }
  };

  const handleAddTask = () => {
    // Basic validation: Ensure task name is not empty
    if (taskName.trim() === "") {
      setTaskNameError("Task name cannot be empty.");
      return;
    }

  
    const handleUpdateTask = () => {
      const updatedTasks = tasks.map((t) =>
        t === editingTask
          ? {
              ...t,
              name: taskName,
              description: document.getElementById("description").value,
              startDate: selectedDate.toDateString(),
              endDate: selectedEndDate.toDateString(),
            }
          : t
      );
      setTasks(updatedTasks);
      setEditingTask(null);
      setTaskName("");
      document.getElementById("description").value = "";
      setSelectedDate(new Date());
      setSelectedEndDate(new Date());
      setActiveView("list"); // Switch back to the list view
    };    
    
    // Create a new task object
    const newTask = {
      name: taskName,
      description: document.getElementById("description").value,
      startDate: selectedDate.toDateString(), // Format the date
      endDate: selectedEndDate.toDateString(), // Format the end date
    };

   

    // Add the new task to the tasks array
    setTasks([...tasks, newTask]);

    // Clear the form fields
    setTaskName("");
    document.getElementById("description").value = "";
    setSelectedDate(new Date());
    setSelectedEndDate(new Date());
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskName(task.name);
    document.getElementById("description").value = task.description;
    setSelectedDate(new Date(task.startDate));
    setSelectedEndDate(new Date(task.endDate));
    setActiveView("form"); // Switch to the form view
  }; 
  
  return (
    <div
      className="App"
      style={{
        backgroundImage: "url(task-manager-background.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Task Manager
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <button
              className={`nav-link ${activeView === "form" ? "active" : ""}`}
              onClick={() => handleNavClick("form")}
            >
              Create Task
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeView === "list" ? "active" : ""}`}
              onClick={() => handleNavClick("list")}
            >
              View-Edit Tasks
            </button>
          </li>
        </ul>
      </nav>

      <div className="container mt-4">
        {activeView === "form" && (
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="form-group">
                <label htmlFor="taskName">Task Name:</label>
                <input
                  type="text"
                  className={`form-control ${
                    taskNameError ? "is-invalid" : ""
                  }`}
                  id="taskName"
                  value={tasks.map((task, index) => task.title)}
                  onChange={handleTaskNameChange}
                />
                {taskNameError && (
                  <div className="invalid-feedback">{taskNameError}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input type="text" className="form-control" id="description" />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">End Date:</label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  value={selectedEndDate.toISOString().slice(0, 10)} // Format date for input field
                  onChange={(e) => setSelectedEndDate(new Date(e.target.value))}
                />
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddTask}
              >
                Add Task
              </button>

              {activeView === "list" && (
                <div>
                  <h2>Task List</h2>
                  <div className="row">
                    {tasks.map((task, index) => {
                      console.log(`Rendering task at index ${index}:`, task); // Log each task object
                      return (
                        <div key={index} className="col-md-4 mb-3">
                          {/* ... card content */}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

{activeView === "list" && (
          <div>
            <h2>Task List</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>{task.startDate}</td>
                    <td>{task.endDate}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm mr-2"
                        onClick={() => handleEditTask(task)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteTask(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}


export default DashboardComponent;
