package com.encora.codesynthesis.service;

import com.encora.codesynthesis.dto.UserDTO;

import java.util.List;

public interface UserService {
    List<UserDTO> getAllUsers();

    UserDTO createUser(UserDTO userDTO);
}
