package com.web.gdup.domain.cody.controller;

import com.web.gdup.domain.cody.dto.CodyDto;
import com.web.gdup.domain.cody.service.CodyServiceImpl;
import io.swagger.annotations.ApiOperation;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = {"http://i6b108.p.ssafy.io:3000"})
@RestController("/cody")
public class CodyController {

    @Autowired
    CodyServiceImpl cs;

    @GetMapping(value = "/testHello")
    @ApiOperation(
            value ="코디 동작 확인",
            notes = "요청하는 경우 Hello 문자열을 반환한다."
    )
    public ResponseEntity<String> testHello(){
        return new ResponseEntity<String>("Hello", HttpStatus.OK);
    }



    @PostMapping(value = "/addCody/{user_id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation(
            value = "코디 추가",
            notes = "코디의 사진, 태크 정보를 받아서 새로운 코디를 만든다."
    )
    public ResponseEntity<String> addCody(@PathVariable(name = "user_id") String id, CodyDto codyDto, @RequestParam MultipartFile image, @RequestParam String[] cody_tag) throws IOException, ParseException {
        ResponseEntity<String> re;
        if(codyDto.getUser_name().equals(id))
            cs.addCodyItem(codyDto, image);
        else
             re = new ResponseEntity<>("사용자 정보와 로그인 정보 일치 하지 않음", HttpStatus.FAILED_DEPENDENCY);


        re = new ResponseEntity<>("Cody 정보 수신 성공", HttpStatus.OK);
        return re;
    }

    @GetMapping(value = "/list")
    @ApiOperation(
            value = "모든 코디 목록 불러오기",
            notes = "모든 사용자의 코디 정보를 불러온다.")
    public ResponseEntity<List<CodyDto>> listCody() {
        return new ResponseEntity<List<CodyDto>>(cs.getCodyListAll(), HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{cody_id}")
    @ApiOperation(
            value = "코디 삭제",
            notes = "cody_id를 받아서 해당 코디를 삭제 합니다."
    )
    public ResponseEntity<String> deleteCody(@PathVariable(name = "cody_id") String cody_id){
        return new ResponseEntity<String>("삭제 성공", HttpStatus.OK);
    }

    @PostMapping(value = "/update/{code_id}")
    @ApiOperation(
            value = "코디 수정",
            notes = "cody_id를 받아서 해당 코디를 수정합니다."
    )
    public ResponseEntity<String> UpdateCody(@PathVariable(name = "cody_id") String cody_id){
        return new ResponseEntity<String>("수정 성공", HttpStatus.OK);
    }





}
