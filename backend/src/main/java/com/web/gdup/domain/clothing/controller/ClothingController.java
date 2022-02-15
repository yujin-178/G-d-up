package com.web.gdup.domain.clothing.controller;

import com.web.gdup.domain.clothing.dto.ClothingDto;
import com.web.gdup.domain.clothing.entity.ClothingEntity;
import com.web.gdup.domain.clothing.service.ClothingService;
import com.web.gdup.domain.model.BasicResponse;
import io.swagger.annotations.ApiOperation;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/clothing")
public class ClothingController {
    @Autowired
    ClothingService clothingService;

    @PostMapping("/tag")
    @ApiOperation(value = "태그 분석 - 파일을 받아 분석")
    public ResponseEntity getTag(@RequestPart("imageFile") MultipartFile file)  {
        HashMap<String, String> data = null;
        ResponseEntity response = null;
        BasicResponse result = new BasicResponse();

        try {
            data = clothingService.getTag(file);
        } catch (IOException e) {
            result.status = false;
            result.message = "fail";
            response = new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
            return response;
        }

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

    @PostMapping("/tagurl")
    @ApiOperation(value = "태그 분석 - url을 받아 분석")
    public ResponseEntity getTagUrl(@RequestPart("imageFile") String fileUrl)  {
        HashMap<String, String> data = null;
        ResponseEntity response = null;
        BasicResponse result = new BasicResponse();

        if(fileUrl== null) {
            result.status = false;
            result.message = "파일 url이 잘못되었습니다.";
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        data = clothingService.getTagUrl(fileUrl);

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

    @PostMapping(value = "/save2")
    @ApiOperation(value = "옷 저장 - 이미지 파일")
    public ResponseEntity insertClothing(@RequestPart(value = "imageFile") MultipartFile file,
                                         @RequestPart(value = "clothing") ClothingDto clothing,
                                         @RequestPart(value = "hashtag", required = false) String hashtag,
                                         @RequestPart(value = "washing", required = false) String washing) throws IOException {
        int data = clothingService.insertClothing(file, clothing, hashtag, washing);
        ResponseEntity response = null;

        BasicResponse result = new BasicResponse();
        if(data != 0) {
            result.status = true;
            result.message = "sucess";
            response = new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            result.status = false;
            result.message = "잘못된 요청입니다.";
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }

        return response;
    }

    @PostMapping(value = "/save")
    @ApiOperation(value = "옷 저장 - 경로")
    public ResponseEntity insertClothingTest(@RequestPart("imageFile") String fileUrl,
                                             @RequestPart("clothing") ClothingDto clothing,
                                             @RequestPart(value = "hashtag", required = false) String hashtag,
                                             @RequestPart(value = "washing", required = false) String washing) throws IOException {
        int data = clothingService.insertClothingUrl(fileUrl, clothing, hashtag, washing);
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
        ResponseEntity response = null;
        BasicResponse result = new BasicResponse();

        HashMap<String, Object> map = null;
        try {
            map = clothingService.getClothing(clothingId);
        } catch (Exception e) {
            result.status = false;
            result.message = "잘못된 접근입니다.";
            response = new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
            return response;
        }

        if(!map.isEmpty()) {
            result.status = true;
            result.message = "sucess";
            result.data = map;
            response = new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            result.status = true;
            result.message = "해당하는 옷이 없습니다.";
            response = new ResponseEntity<>(result, HttpStatus.OK);
        }
        return response;
    }

    @GetMapping("/detail/base64/{clothingId}")
    @ApiOperation(value = "옷 상세보기")
    public ResponseEntity getDetailTest(@PathVariable("clothingId") int clothingId) {
        ResponseEntity response = null;
        BasicResponse result = new BasicResponse();
        HashMap<String, Object> map = null;

        try {
            map = clothingService.getClothingBase(clothingId);
        } catch (Exception e) {
            result.status = false;
            result.message = "사진을 불러올 수 없습니다.";
            response = new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
            return response;
        }

        if(!map.isEmpty()) {
            result.status = true;
            result.message = "sucess";
            result.data = map;
            response = new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            result.status = true;
            result.message = "해당하는 옷이 없습니다.";
            response = new ResponseEntity<>(result, HttpStatus.OK);
        }
        return response;
    }

    @GetMapping("/list/{userName}")
    @ApiOperation(value = "옷 리스트 - 사용자 id 필요")
    public ResponseEntity getAllClothing(@PathVariable(value = "userName", required = false) String userName) {
        ResponseEntity response = null;
        BasicResponse result = new BasicResponse();
        List<HashMap<String, Object>> list = null;
        try {
            list = clothingService.getUserClothing(userName);
        } catch (Exception e) {
            result.status = false;
            result.message = "사용자가 존재하지 않습니다.";
            response = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
            return response;
        }

        if(!list.isEmpty()) {
            result.status = true;
            result.message = "success";
            result.data = list;
            response = new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            result.status = true;
            result.message = "사용자의 옷이 존재하지 않습니다.";
            result.data = new ArrayList<HashMap<String, Object>>();
            response = new ResponseEntity<>(result, HttpStatus.OK);
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