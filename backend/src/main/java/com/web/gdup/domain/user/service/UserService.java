package com.web.gdup.domain.user.service;

import com.web.gdup.domain.user.dto.SignupRequest;
import com.web.gdup.domain.user.dto.UserDto;

import java.util.Optional;

public interface UserService {
    Optional<UserDto> login(String email, String password);
    boolean signup(SignupRequest request);
}
