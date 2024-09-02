package com.encora.codesynthesis.mapper;

import com.encora.codesynthesis.dto.UserDTO;
import com.encora.codesynthesis.model.User;
import org.mapstruct.Context;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
    public interface UserMapper {
        UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

        UserDTO toUserDto(User user, @Context NotificatorMappingContext context);

        @InheritInverseConfiguration
        User fromUserDto(UserDTO userDTO, @Context NotificatorMappingContext context);

        List<UserDTO> toUserDto(List<User> user, @Context NotificatorMappingContext context);

        @InheritInverseConfiguration
        List<User> fromUserDto(List<UserDTO> userDTOList, @Context NotificatorMappingContext context);
    }

