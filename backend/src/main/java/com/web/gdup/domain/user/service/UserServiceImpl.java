package com.web.gdup.domain.user.service;

import com.web.gdup.domain.user.dto.SignupRequest;
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

    @Override
    public boolean signup(SignupRequest request) {

        Optional<UserDto> user = userRepository.findById(request.getUserName());

        if(!user.isPresent()){ // 해당 유저네임으로 가입된 사람들이 없기 때문에, 진행 가능
            System.out.println("회원가입 진행 가능");
            userRepository.save(new UserDto(request.getUserName(), request.getPassword(), request.getEmail()));
            return  true;
        }
        System.out.println("이미 있다.");
        return false;
    }

    @Override
    public UserDto  getUserInfo(String targetName) {
       return userRepository.getOne(targetName);
    }
}
