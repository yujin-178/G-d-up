package com.web.gdup.domain.user.service;

import com.web.gdup.domain.user.dto.UserDto;
import com.web.gdup.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements  UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<UserDto> login(String email, String password) {
        Optional<UserDto> user = userRepository.findUserByEmailAndPassword(email, password);
        System.out.println(user);
        return user;
    }
}
