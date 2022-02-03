package com.web.curation.controller.account;

import java.time.LocalDateTime;
import java.util.Optional;

import javax.validation.Valid;

import com.web.curation.dao.user.UserDao;
import com.web.curation.model.BasicResponse;
import com.web.curation.model.user.SignupRequest;
import com.web.curation.model.user.User;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;

import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@ApiResponses(value = { @ApiResponse(code = 401, message = "Unauthorized", response = BasicResponse.class),
        @ApiResponse(code = 403, message = "Forbidden", response = BasicResponse.class),
        @ApiResponse(code = 404, message = "Not Found", response = BasicResponse.class),
        @ApiResponse(code = 500, message = "Failure", response = BasicResponse.class) })

@CrossOrigin(origins = { "http://localhost:8081" })
@RestController
public class AccountController {

    @Autowired
    UserDao userDao;

    @GetMapping("/account/login")
    @ApiOperation(value = "로그인")
    public Object login(@RequestParam(required = true) final String email,
            @RequestParam(required = true) final String password) {
        //  개발을 할 때 가장 많이 발생하는 예외 중 하나가 바로 NPE(NullPointerException)이다.
        // NPE를 피하기 위해서는 null을 검사하는 로직을 추가해야 하는데,
        // null 검사를 해야하는 변수가 많은 경우 코드가 복잡해지고 로직이 상당히 번거롭다.
        // 그렇기 때문에 null 대신 초기값을 사용하길 권장하기도 한다.

        //  Java8에서는 Optional<T> 클래스를 사용해 NPE를 방지할 수 있도록 도와준다.
        // Optional<T>는 null이 올 수 있는 값을 감싸는 Wrapper 클래스로,
        // 참조하더라도 NPE가 발생하지 않도록 도와준다.
        // Optional 클래스는 아래와 같은 value에 값을 저장하기 때문에 null이더라도 바로 NPE가 발생하지 않으며,
        // 클래스이기 때문에 각종 메소드를 제공해준다.
        Optional<User> userOpt = userDao.findUserByEmailAndPassword(email, password);

        ResponseEntity response = null;

        if (userOpt.isPresent()) {
            final BasicResponse result = new BasicResponse();
            result.status = true;
            result.data = "success";
            response = new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return response;
    }

    @PostMapping("/account/signup")
    @ApiOperation(value = "가입하기")
    public Object signup(@Valid @RequestBody SignupRequest request) {
        // 이메일, 닉네임 중복처리 필수
        // 회원가입단을 생성해 보세요.
        User info = new User(request.getNickname(), request.getPassword(), request.getEmail(), LocalDateTime.now());
        System.out.println(info.getUid());
        System.out.println(info.getPassword());
        System.out.println(info.getEmail());
        System.out.println(info.getCreateDate());
        System.out.println(userDao.getUserByEmail(info.getEmail()));
        System.out.println(userDao.getUserByUid(info.getUid()));

        final BasicResponse result = new BasicResponse();
        if(userDao.getUserByEmail(info.getEmail()) == null && userDao.getUserByUid(info.getUid()) == null){
            result.status = true;
            result.data = "회원 정보 등록 성공";
            System.out.println(userDao.save(info));
            System.out.println("회원 정보 등록 성공");
        }else{
            result.status = false;
            result.data = "회원 정보 등록 실패";
            System.out.println("회원 정보 등록 실패");
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/account/modify")
    @ApiOperation(value = "회원정보수정")
    public Object modifyInfo(@Valid @RequestBody SignupRequest request){
        User info = new User(request.getNickname(), request.getPassword(), request.getEmail(), LocalDateTime.now());

        final BasicResponse result = new BasicResponse();
        if(userDao.getUserByUid(info.getUid()) != null) {
            result.status = true;
            result.data = "회원 정보 변경 성공";
            System.out.println(userDao.save(info));
        }else{
            result.status = false;
            result.data = "회원 정보 등록 실패";
            System.out.println("회원 정보 변경 실패");
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }



}