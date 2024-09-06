import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/tasks'; // Your tasks API base URL

class TaskService {

  constructor() {
    this.axiosInstance = axios.create(  {baseURL: 'http://localhost:8080/tasks'});
  }

  setAxiosInstance(axiosInstance) {
     this.axiosInstance = axiosInstance;
  }


  getTasks() {
    return this.axiosInstance.get(API_BASE_URL);
  }

  addTask(task) {
    return this.axiosInstance.post(API_BASE_URL, task);
  }

  updateTask(task) {
    return this.axiosInstance.put(`${API_BASE_URL}/${task.id}`, task); // Assuming you have task IDs
  }

  deleteTask(taskId) {
    return this.axiosInstance.delete(`${API_BASE_URL}/${taskId}`);
  }
}

export default new TaskService();
