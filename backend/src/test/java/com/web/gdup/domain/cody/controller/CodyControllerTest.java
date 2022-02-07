package com.web.gdup.domain.cody.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
//테스트를 진행할 때 JUint에 내장된 실행자 외에 다른 실행자를 실행시킵니다.
//여기서는 SpringRunner라는 스프링 실행자를 사용합니다.
//즉, 스프링 부트 테스트와 JUnit 사이에 연갈자 역할을 합니다.
@WebMvcTest(controllers = CodyController.class)
//여러 스프링 테스트 어노테이션 중, Web(Spring MVC)에 집중할 수 있는 어노테이션입니다.
//선언할 경우 @Controller, @ControllerAdvice 등을 사용할 수 있습니다.
//단, @Service, @Component, @Repository 등은 사용할 수 없다.
//여기서는 컨트롤러만 사용한다.
public class CodyControllerTest {
    @Autowired
    private MockMvc mvc;
//https://velog.io/@swchoi0329/Spring-Boot-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%BD%94%EB%93%9C-%EC%9E%91%EC%84%B1
    @Test
    public void hello_test() throws Exception{
        String hello = "hello";
//        mvc.perform(get("/hello"))
//                .andExpect(status().isOk())
//                .andExpect(content().string(hello));
    }
}
