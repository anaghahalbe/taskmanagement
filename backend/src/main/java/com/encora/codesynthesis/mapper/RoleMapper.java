package com.encora.codesynthesis.mapper;

import com.encora.codesynthesis.dto.RoleDTO;
import com.encora.codesynthesis.model.Role;
import org.mapstruct.Context;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.factory.Mappers;

import java.util.Set;

public interface RoleMapper {
    RoleMapper INSTANCE = Mappers.getMapper(RoleMapper.class);
    RoleDTO toRoleDto(Role role, @Context NotificatorMappingContext context);

    @InheritInverseConfiguration
    Role fromRoleDTO(RoleDTO roleDTO, @Context NotificatorMappingContext context);

    Set<RoleDTO> toRolesDTO(Set<Role> roles, @Context NotificatorMappingContext context);

    @InheritInverseConfiguration
    Set<Role> fromRolesDTO(Set<RoleDTO> roleDTOS, @Context NotificatorMappingContext context);
}
