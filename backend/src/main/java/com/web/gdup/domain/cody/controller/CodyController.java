package com.web.gdup.domain.cody.controller;

import com.web.gdup.domain.cody.dto.*;
import com.web.gdup.domain.cody.entity.CodyEntity;
import com.web.gdup.domain.cody.service.CodyServiceImpl;
import com.web.gdup.domain.model.BasicResponse;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/cody")
public class CodyController {

    @Autowired
    private CodyServiceImpl cs;

    @PostMapping(value = "/create")
    @ApiOperation(
            value = "코디 추가",
            notes = "유저의 모든 코디 목록을 보내준다."
    )
    public ResponseEntity<BasicResponse> createCody(@RequestPart(value = "imageFile") MultipartFile file, @RequestPart(value = "createCody") CreateCody cc) {
        ResponseEntity<BasicResponse> responseBody;

        BasicResponse result = new BasicResponse();

        result.status = true;
        result.message = "코디 생성 성공";
        result.data = cs.addCodyItem(cc, file);

        responseBody =  new ResponseEntity<>(result, HttpStatus.OK);

        return responseBody;
    }


    @PutMapping(value = "/update")
    @ApiOperation(
            value = "코디 수정",
            notes = "수정된 코드 정보를 받아서 해당 코디를 수정합니다."
    )
    public ResponseEntity<BasicResponse> updateCody(@RequestPart(value = "imageFile") MultipartFile file, @RequestPart(value = "updateCody") UpdateCody uc) {

        ResponseEntity<BasicResponse> responseBody;

        BasicResponse result = new BasicResponse();

        result.status = true;
        result.message = "코디 수정 성공";
        result.data = cs.updateCodyItem(uc, file);

        responseBody =  new ResponseEntity<>(result, HttpStatus.OK);

        return responseBody;

    }

    @DeleteMapping(value = "/delete/{codyId}")
    @ApiOperation(
            value = "코디 삭제",
            notes = "cody_id를 받아서 해당 코디를 삭제 합니다."
    )
    public ResponseEntity<BasicResponse> deleteCody(@PathVariable(name = "codyId") int cody_id) {

        ResponseEntity<BasicResponse> responseBody;
        BasicResponse result = new BasicResponse();

        result.status = true;
        result.message = "코디 삭제 성공";
        result.data = cs.deleteCodyItem(cody_id) ;

        responseBody =  new ResponseEntity<>(result, HttpStatus.OK);

        return responseBody;

    }

    @GetMapping(value = "/read/{userName}")
    @ApiOperation(
            value = "코디 목록 불러오기",
            notes = "특정 유저의 코디 목록 불러오기"
    )
    public ResponseEntity<BasicResponse> readCodyList(@PathVariable(name = "userName") String userName) {

        ResponseEntity<BasicResponse> responseBody;
        BasicResponse result = new BasicResponse();

        result.status = true;
        result.message = userName + "의 코디 목록 불러오기 성공";
        result.data = cs.getUserCodyList(userName) ;

        responseBody =  new ResponseEntity<>(result, HttpStatus.OK);

        return responseBody;
    }

}

