package com.web.gdup.domain.cody.controller;


import com.web.gdup.domain.cody.dto.CodyDto;
import com.web.gdup.domain.cody.repository.CodyRepository;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/cody")
public class CodyController {

    @Autowired
    CodyRepository cr;

    @GetMapping("/hello")
    @ApiOperation(value = "testhello")
    public String hello(){
        CodyDto tmp =cr.getOne(1L);
        List<CodyDto> list = cr.findAll();
        for(CodyDto c : list){
            System.out.println(c);
        }
        System.out.println(tmp);
        return "hello";
    }
}
