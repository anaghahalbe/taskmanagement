package com.encora.codesynthesis.repository;

import com.encora.codesynthesis.model.ERole;
import com.encora.codesynthesis.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
