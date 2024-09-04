package com.encora.codesynthesis.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.encora.codesynthesis.models.Task;

public interface TaskRepository extends MongoRepository<Task, String> {

    List<Task> findByUserId(String userId);

 
}
