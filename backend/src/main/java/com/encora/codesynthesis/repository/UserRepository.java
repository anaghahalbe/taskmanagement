package com.encora.codesynthesis.repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.encora.codesynthesis.models.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, Integer> {

    Optional<User> findUserByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);


}
