package com.encora.codesynthesis.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.encora.codesynthesis.models.ERole;
import com.encora.codesynthesis.models.Role;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, Integer> {
    
    Optional<Role> findByName(ERole name);
}

