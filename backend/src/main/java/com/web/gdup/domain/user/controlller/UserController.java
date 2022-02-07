package com.web.gdup.domain.user.controlller;

import com.web.gdup.domain.model.BasicResponse;
import com.web.gdup.domain.user.dto.UserDto;
import com.web.gdup.domain.user.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    @ApiOperation(value = "로그인", notes = "로그인을 위해 이메일과 패스워드를 입력받는다.")
    public Object login(@RequestParam(required = true) final String email,
                        @RequestParam(required = true) final String password){
        Optional<UserDto> user = userService.login(email, password);
        ResponseEntity response = null;

        if(user.isPresent()){
            final BasicResponse result = new BasicResponse();
            result.status = true;
            result.data = "success";
            response = new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return response;
    }
}
