package com.web.gdup.domain.clothing.controller;

import com.web.gdup.domain.clothing.repository.ClothingRepository;
import com.web.gdup.domain.model.ImageModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

import java.util.List;

@CrossOrigin(origins = {"http://i6b108.p.ssafy.io:3000"})
@RestController("/clothing")
public class ClothingController {
    @Autowired
    ClothingRepository cr;

    @GetMapping("/test")
    @ApiOperation(value = "테스트")
    public String test() {
        return "안녕";
    }

    @GetMapping("/testt")
    @ApiOperation(value = "jpa 테스트")
    public void getTestt() {
        List<ImageModel> list = cr.findAll();
        System.out.println(list.size());

        for (ImageModel im : list) {
            System.out.println(im);
        }
    }
}
