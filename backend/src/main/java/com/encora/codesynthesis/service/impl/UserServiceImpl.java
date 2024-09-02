package com.encora.codesynthesis.service.impl;

import com.encora.codesynthesis.dto.UserDTO;
import com.encora.codesynthesis.mapper.NotificatorMappingContext;
import com.encora.codesynthesis.mapper.*;
import com.encora.codesynthesis.model.Role;
import com.encora.codesynthesis.model.User;
import com.encora.codesynthesis.repository.UserRepository;
import com.encora.codesynthesis.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private PasswordEncoder encoder;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().
                map(user -> UserMapper.INSTANCE.toUserDto(user, new NotificatorMappingContext()))
                .collect(Collectors.toList());
    }


    @Override
        public UserDTO createUser(UserDTO userDTO) {
            final User createUser = new User();
        final Set<Role> createRole= RoleMapper.INSTANCE.fromRolesDTO(userDTO.getRole(),new NotificatorMappingContext());

            createUser.setUsername(userDTO.getUsername());
            createUser.setFirstName(userDTO.getFirstName());
            createUser.setLastName(userDTO.getLastName());
            createUser.setEmail(userDTO.getEmail());

        createUser.setPassword(encoder.encode(userDTO.getPassword()));
        createUser.setRoles(createRole);


            final User saveUser = userRepository.save(createUser);

            return UserMapper.INSTANCE.toUserDto(saveUser, new NotificatorMappingContext());
        }


}
