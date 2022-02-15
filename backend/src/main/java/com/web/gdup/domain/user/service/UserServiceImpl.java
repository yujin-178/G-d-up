package com.web.gdup.domain.user.service;

import com.web.gdup.domain.user.Entity.UserEntity;
import com.web.gdup.domain.user.dto.SignupRequest;
import com.web.gdup.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Service
public class UserServiceImpl implements  UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<UserEntity> login(String email, String password) throws Exception {
        SHA256 sha256 = new SHA256();
        String ciphertext = sha256.encrypt(password);
        Optional<UserEntity> user = userRepository.findUserByEmailAndPassword(email, ciphertext);
        user.orElseThrow(()-> new Exception("null"));
        return user;
    }

    @Override
    public UserEntity signup(SignupRequest request) throws NoSuchAlgorithmException {

        Optional<UserEntity> user = userRepository.findById(request.getUserName());
        UserEntity newUser = null;
        if(!user.isPresent()){ // 해당 유저네임으로 가입된 사람들이 없기 때문에, 진행 가능
            SHA256 sha256 = new SHA256();
            String ciphertext = sha256.encrypt(request.getPassword());
            newUser = userRepository.save(new UserEntity(request.getUserName(), ciphertext, request.getEmail()));
        }
        return newUser;
    }

    @Override
    public boolean getUserInfo(String targetName) {
        Optional<UserEntity> user = userRepository.findById(targetName);
        if (user.isPresent()) return true;
        return false;
    }

    @Override
    public Optional<UserEntity> getUserEntity(String targetName) {
        return userRepository.findById(targetName);
    }

    @Override
    public boolean finUserByEmail(String email) {
        Optional<UserEntity> user = userRepository.findUserByEmail(email);
        if (user.isPresent()) return true;
        return false;
    }
}
