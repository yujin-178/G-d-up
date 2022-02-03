package com.web.gdup.domain.clothing.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "http://i6b108.p.ssafy.io:3000" })
@RestController("/clothing")
public class clothingController {
	@GetMapping("/test")
    @ApiOperation(value = "테스트")
    public String test() {
		return "안녕";
    }
}
