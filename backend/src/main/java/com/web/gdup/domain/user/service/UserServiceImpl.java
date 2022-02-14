package com.web.gdup.domain.user.service;

import com.web.gdup.domain.user.Entity.UserEntity;
import com.web.gdup.domain.user.dto.SignupRequest;
import com.web.gdup.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements  UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<UserEntity> login(String email, String password) throws Exception {
        Optional<UserEntity> user = userRepository.findUserByEmailAndPassword(email, password);
        user.orElseThrow(()-> new Exception("null"));
        return user;
    }

    @Override
    public UserEntity signup(SignupRequest request){

        Optional<UserEntity> user = userRepository.findById(request.getUserName());
        UserEntity newUser = null;
        if(!user.isPresent()){ // 해당 유저네임으로 가입된 사람들이 없기 때문에, 진행 가능
            newUser = userRepository.save(new UserEntity(request.getUserName(), request.getPassword(), request.getEmail()));
        }
        return newUser;
    }

    @Override
    public boolean getUserInfo(String targetName) {
        Optional<UserEntity> user = userRepository.findById(targetName);
        if (user.isPresent()) return true;
        return false;
    }
}
