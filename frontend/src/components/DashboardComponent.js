import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService'; 
import TaskService from '../services/TaskService';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';


const DashboardComponent = () => {
  const [activeView, setActiveView] = useState('list'); // Start with the list view
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskNameError, setTaskNameError] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedDueDate, setSelectedDueDate] = useState(new Date());
  const [selectedCompletionFlag,setSelectedCompletionFlag] = useState(false);
  const [selectedCompletionDate, setSelectedCompletionDate] = useState(new Date());
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
   // Assuming you have getCurrentUser in AuthService
    if (!user) {
      navigate('/'); // Redirect to login if not logged in
    } else {
      
      const authAxios = axios.create({
        headers: { 
        'Authorization' : `${user}` 
      }
      });
      TaskService.setAxiosInstance(authAxios);
      fetchTasks();
    }
  }, [navigate]); 

  const fetchTasks = async () => {
    setIsLoading(true); // Use async/await for cleaner async handling
    try {
      const response = await TaskService.getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      // Consider displaying an error message to the user
    }finally {
      setIsLoading(false); // Clear loading state after success or error
    }
  };


  const handleNavClick = (view) => {
    setActiveView(view);
  };

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
    setTaskNameError(e.target.value.trim() === '' ? 'Task name is required' : '');
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskName(task.name);
    setTaskDescription(task.description);
    setSelectedDueDate(new Date(task.dueDate));
    setSelectedCompletionDate(new Date(task.completionDate));
    setActiveView('form');
  };


  const resetForm = () => {
    setTaskName('');
    setTaskDescription('');
    setSelectedDueDate(new Date());
    setSelectedCompletionDate(new Date());
    setTaskNameError(null);
  };

  const handleAddTask = async () => {
    if (taskName.trim() === '') {
      setTaskNameError('Task name is required');
      return;
    }

    const newTask = {
      name: taskName,
      description: taskDescription,
      dueDate: selectedDueDate.toISOString().slice(0, 10), 
      completionDate: selectedCompletionDate.toISOString().slice(0, 10),
      isComplete: selectedCompletionFlag,
    };


    try {
      await TaskService.addTask(newTask);
      fetchTasks(); // Refresh task list after adding
      resetForm(); // Clear the form
      setActiveView('list'); // Switch to the list view after adding
    } catch (error) {
      console.error('Error adding task:', error);
      // Handle error, e.g., display error message
    }
  };

  const handleUpdateTask = async () => {
    if (taskName.trim() === '') {
      setTaskNameError('Task name is required');
      return;
    }

    if (!editingTask) { 
      console.error('No task selected for editing.');
      return;
    }


      const updatedTask = {
        id: editingTask.id, 
        name: taskName,
        description: taskDescription,
        dueDate: selectedDueDate.toISOString().slice(0, 10),
        completionDate: selectedCompletionDate.toISOString().slice(0, 10),
        isComplete: selectedCompletionFlag,
        userId: editingTask.userId,
      };
  
      try {
        await TaskService.updateTask(updatedTask);
        setEditingTask(null); 
        fetchTasks(); 
        resetForm(); 
        setActiveView('list');
      } catch (error) {
        console.error('Error updating task:', error);
        // Handle error
      }
    };

    const handleDeleteTask = async (taskId) => {
      try {
        await TaskService.deleteTask(taskId);
        fetchTasks(); 
        setActiveView('list');
      } catch (error) {
        console.error('Error deleting task:', error);
        // Handle error
      }
    };

  return (
    <div
      className="App"
      style={{
        backgroundImage: 'url(task-manager-background.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* ... your navbar code ... */}

      <div>
          {activeView === 'list' && ( 
            <button className="add-button" onClick={() => handleNavClick('form')}>Add New Task</button>
          )}
          {activeView === 'form' && (
            <button className="view-task-list-button"  onClick={() => handleNavClick('list')}>View Task List</button>
          )}
            <button className="logout-button" onClick={AuthService.logout}>Logout</button> 
        </div>

      

      <div className="container mt-4">
        {activeView === 'form' && (
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form>
              <div className="form-group">
                <label htmlFor="taskName">Task Name:</label>
                <input
                  type="text"
                  className={`form-control ${taskNameError ? 'is-invalid' : ''}`}
                  id="taskName"
                  value={taskName} 
                  onChange={handleTaskNameChange}
                />
                {taskNameError && (
                  <div className="invalid-feedback">{taskNameError}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="startDate">Due Date:</label>
                <DatePicker
                  id="startDate"
                  className="form-control"
                  selected={selectedDueDate}
                  onChange={(date) => setSelectedDueDate(date)}
                  dateFormat="yyyy-MM-dd" 
                />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">Completion Date:</label>
                <DatePicker
                  id="endDate"
                  className="form-control"
                  selected={selectedCompletionDate}
                  onChange={(date) => setSelectedCompletionDate(date)}
                  dateFormat="yyyy-MM-dd" 
                />
              </div>
              <div className="form-group">
                <label htmlFor="isComplete">Is Task Completed?</label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isComplete"
                  value={selectedCompletionFlag}
                  onChange={(e) => setSelectedCompletionFlag(e.target.value)}
                />
              </div>
              {editingTask ? ( 
                <button
                  type="button"
                  className="edit-button"
                  onClick={handleUpdateTask}
                >
                  Update Task
                </button>
              ) : (
                <button
                  type="button"
                  className="delete-button"
                  onClick={handleAddTask}
                >
                  Add Task
                </button>
              )}

</form>
            </div>
            
          </div>
         
        )}

        {activeView === 'list' && (
          <div>
            <h2>Task List</h2>
            { isLoading ? ( // Conditionally render loading indicator
          <p>Loading tasks...</p> 
        ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Due Date</th>
                  <th>Completion Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>{task.dueDate}</td> 
                    <td>{task.completionDate}</td> 
                    <td>
                      <button
                        type="button"
                        className="edit-button"
                        onClick={() => handleEditTask(task)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => handleDeleteTask(task.id)} 
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardComponent;

