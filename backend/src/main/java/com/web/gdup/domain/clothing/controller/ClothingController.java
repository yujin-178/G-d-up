package com.web.gdup.domain.clothing.controller;

import com.web.gdup.domain.clothing.dto.ClothingDto;
import com.web.gdup.domain.clothing.entity.ClothingEntity;
import com.web.gdup.domain.clothing.service.ClothingServiceImpl;
import com.web.gdup.domain.model.BasicResponse;
import io.swagger.annotations.ApiOperation;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = { "http://i6b108.p.ssafy.io:3000" })
@RestController
@RequestMapping("/clothing")
public class ClothingController {
    @Autowired
    ClothingServiceImpl clothingService;

    @PostMapping("/tag")
    @ApiOperation(value = "태그 분석")
    public ResponseEntity getTag(@RequestParam("imageFile") MultipartFile file) throws IOException  {
        HashMap<String, String> data = clothingService.getTag(file);
        ResponseEntity response = null;

        BasicResponse result = new BasicResponse();
        if(!data.isEmpty()) {
            result.status = true;
            result.message = "sucess";
            result.data = data;
            response = new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            result.status = false;
            result.message = "fail";
            response = new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response;
    }

    @PostMapping("/background")
    @ApiOperation(value = "배경 제거 API")
    public ResponseEntity getRemoveBg(@RequestPart("imageFile") MultipartFile file)
            throws IOException, ParseException {
        String data = clothingService.getRemoveBg(file);
        ResponseEntity response = null;

        BasicResponse result = new BasicResponse();
        if(data != null) {
            result.status = true;
            result.message = "sucess";
            result.data = data;
            response = new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            result.status = false;
            result.message = "fail";
            response = new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return response;
    }

    @PostMapping(value = "/save")
    @ApiOperation(value = "옷 저장")
    public ResponseEntity insertClothing(@RequestPart("imageFile") MultipartFile file, @RequestPart("clothing") ClothingDto clothing, @RequestParam("hashtag") String hashtag) throws IOException {
        int data = clothingService.insertClothing(file, clothing, hashtag);
        ResponseEntity response = null;

        BasicResponse result = new BasicResponse();
        if(data != 0) {
            result.status = true;
            result.message = "sucess";
            response = new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            result.status = false;
            result.message = "fail";
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }

        return response;
    }

    @GetMapping("/detail/{clothingId}")
    @ApiOperation(value = "옷 상세보기")
    public ResponseEntity getClothing(@PathVariable("clothingId") int clothingId) {
        HashMap<String, Object> map = clothingService.getClothing(clothingId);
        ResponseEntity response = null;
        BasicResponse result = new BasicResponse();

        if(!map.isEmpty()) {
            result.status = true;
            result.message = "sucess";
            result.data = map;
            response = new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            result.status = false;
            result.message = "해당하는 옷이 없습니다.";
            response = new ResponseEntity<>(result, HttpStatus.NO_CONTENT);
        }
        return response;
    }

    @GetMapping("/list/{userName}")
    @ApiOperation(value = "옷 리스트 - 사용자 id 필요")
    public ResponseEntity getAllClothing(@PathVariable("userName") String userName) {
        List<HashMap<String, Object>> list = clothingService.getUserClothing(userName);
        ResponseEntity response = null;
        BasicResponse result = new BasicResponse();

        if(!list.isEmpty()) {
            result.status = true;
            result.message = "success";
            result.data = list;
            response = new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            result.status = false;
            result.message = "사용자의 옷이 존재하지 않습니다.";
            response = new ResponseEntity<>(result, HttpStatus.NO_CONTENT);
        }
        return response;
    }

    @DeleteMapping("/{clothingId}")
    @ApiOperation(value = "옷 삭제")
    public ResponseEntity deleteClothing(@PathVariable("clothingId") int clothingId) {
        Optional<ClothingEntity> deleteClothing = clothingService.deleteClothing(clothingId);
        ResponseEntity response = null;
        BasicResponse result = new BasicResponse();

        if(!deleteClothing.isPresent()) {
            result.status = true;
            result.message = "sucess";
            response = new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            result.status = false;
            result.message = "옷 삭제 실패";
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return response;
    }
}