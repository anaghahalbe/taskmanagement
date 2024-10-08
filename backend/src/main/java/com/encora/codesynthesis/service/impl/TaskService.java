package com.encora.codesynthesis.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.encora.codesynthesis.models.Task;
import com.encora.codesynthesis.repository.TaskRepository;

@Service
public class TaskService {

      @Autowired
    private TaskRepository taskRepository;

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks(String userId) {
        return taskRepository.findByUserId(userId);
    }

  public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }


    public Task getTaskById(String id) {
        return  taskRepository.findById(id).orElse(null);
    }

    public Task updateTask(String id, Task updatedTask) {
        if (taskRepository.existsById(id)) {
            updatedTask.setId(id); // Ensure the ID is set for the update
            return taskRepository.save(updatedTask);
        }
        return null; 
    }

    public boolean deleteTask(String id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
