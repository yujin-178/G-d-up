package com.web.gdup.domain.user.repository;

import com.web.gdup.domain.user.dto.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserDto, String> {
    Optional<UserDto> findUserByEmailAndPassword(String email, String password);
}
