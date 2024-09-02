package com.encora.codesynthesis.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@RequiredArgsConstructor
public class UserDTO {
    private int id;
    private String email;
    @JsonIgnore
    private String password;
    private String username;
    private String firstName;
    private String lastName;
    private Set<RoleDTO> role = new HashSet<>();
}