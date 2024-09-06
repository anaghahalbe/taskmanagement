package com.encora.codesynthesis.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.encora.codesynthesis.models.Task;
import com.encora.codesynthesis.repository.UserRepository;
import com.encora.codesynthesis.service.impl.TaskService;
import com.encora.codesynthesis.service.impl.UserDetailsImpl;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    UserRepository userRepository;


    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

     @PostMapping
     @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getPrincipal() instanceof UserDetailsImpl ?
                       ((UserDetailsImpl) authentication.getPrincipal()).getId().toString() :
                       authentication.getPrincipal().toString();
        task.setUserId(userId);
        Task createdTask = taskService.createTask(task);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);  
    }
    
    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<Task>> getAllTasks() {
         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
     String userId = authentication.getPrincipal() instanceof UserDetailsImpl ?
                    ((UserDetailsImpl) authentication.getPrincipal()).getId().toString() :
                    authentication.getPrincipal().toString();               
        List<Task> tasks = taskService.getAllTasks(userId) ;
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Task> getTaskById(@PathVariable String id) {
        Task task = taskService.getTaskById(id);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getPrincipal() instanceof UserDetailsImpl ?
        ((UserDetailsImpl) authentication.getPrincipal()).getId().toString() :
        authentication.getPrincipal().toString(); 
        if((task!=null) && (task.getUserId().equals(userId)))
        {
            return new ResponseEntity<>(task, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Task> updateTask(@PathVariable String id, @RequestBody Task updatedTask) {
        Task task = taskService.updateTask(id, updatedTask);
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getPrincipal() instanceof UserDetailsImpl ?
        ((UserDetailsImpl) authentication.getPrincipal()).getId().toString() :
        authentication.getPrincipal().toString(); 
        if ((task != null) && (task.getUserId().equals(userId))) {
            return new ResponseEntity<>(task, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        Task task = taskService.getTaskById(id);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getPrincipal() instanceof UserDetailsImpl ?
        ((UserDetailsImpl) authentication.getPrincipal()).getId().toString() :
        authentication.getPrincipal().toString(); 
       boolean deleted = false;
       if (task.getUserId().equals(userId)){
        deleted = taskService.deleteTask(id);
    }
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
