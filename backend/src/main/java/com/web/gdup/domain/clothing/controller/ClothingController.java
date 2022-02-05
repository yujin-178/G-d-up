package com.web.gdup.domain.clothing.controller;

import com.web.gdup.domain.clothing.service.ClothingServiceImpl;
import io.swagger.annotations.ApiOperation;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin(origins = { "http://i6b108.p.ssafy.io:3000" })
@RestController
@RequestMapping("/clothing")
public class ClothingController {
    @Autowired
    ClothingServiceImpl clothingService;


    @GetMapping("/test2")
    @ApiOperation(value = "jpa 테스트")
    public void getTest() {
//        System.out.println(common.getConfig().getApiKey());
//        List<ImageModel> list  = cr.findAll();
//        System.out.println(list.size());
//
//        for(ImageModel im : list) {
//            System.out.println(im);
//        }
    }

    @PostMapping("/tag")
    @ApiOperation(value = "태그 분석")
    public ResponseEntity<String> getTag(@RequestParam("imageFile") MultipartFile file) throws IOException  {
        return new ResponseEntity<String>(clothingService.getTag(file), HttpStatus.OK);
    }

    @PostMapping("/background")
    @ApiOperation(value = "배경 제거 API")
    public ResponseEntity<String> getRemoveBg(@RequestParam("imageFile") MultipartFile file)
            throws IOException, ParseException {
        return new ResponseEntity<>(clothingService.getRemoveBg(file), HttpStatus.OK);
    }

    @PostMapping("/save")
    @ApiOperation(value = "옷 저장")
    public ResponseEntity<String> insertClothing() {
        return new ResponseEntity<String>("SUCESS", HttpStatus.OK);
    }
}
