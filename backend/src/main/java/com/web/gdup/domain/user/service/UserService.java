package com.web.gdup.domain.user.service;

import com.web.gdup.domain.user.Entity.UserEntity;
import com.web.gdup.domain.user.dto.SignupRequest;

import java.util.Optional;

public interface UserService {
    Optional<UserEntity> login(String email, String password) throws Exception;
    UserEntity signup(SignupRequest request) throws Exception;
    boolean getUserInfo(String targetName);
    boolean finUserByEmail(String email);

}
