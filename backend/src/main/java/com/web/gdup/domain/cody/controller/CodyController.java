package com.web.gdup.domain.cody.controller;

import com.web.gdup.domain.cody.dto.CodyDtoAll;
import com.web.gdup.domain.cody.dto.CreateCody;
import com.web.gdup.domain.cody.dto.UpdateCody;
import com.web.gdup.domain.cody.service.CodyServiceImpl;
import com.web.gdup.domain.model.BasicResponse;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

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
        Optional<CodyDtoAll> codyDtoAll;
        try {
            codyDtoAll = Optional.ofNullable(cs.addCodyItem(cc, file));
        } catch (Exception e) {
            result.status = false;
            result.message = "잘못된 정보 입력";
            result.data = null;
            responseBody = new ResponseEntity<>(result, HttpStatus.OK);
            return responseBody;
        }

        if (codyDtoAll.isPresent()) {
            result.status = true;
            result.message = "코디 생성 성공";
            result.data = codyDtoAll;
        } else {
            result.status = false;
            result.message = "코디 생성 실패";
            result.data = codyDtoAll;
        }
        responseBody = new ResponseEntity<>(result, HttpStatus.OK);
        return responseBody;
    }


    @PutMapping(value = "/update/file")
    @ApiOperation(
            value = "코디 수정 - 파일까지 수정한다.",
            notes = "수정된 코드 정보를 받아서 해당 코디를 수정합니다."
    )
    public ResponseEntity<BasicResponse> updateCodyAndFile(@RequestPart(value = "imageFile") MultipartFile file, @RequestPart(value = "updateCody") UpdateCody updateCody) {

        ResponseEntity<BasicResponse> responseBody;

        BasicResponse result = new BasicResponse();
        Optional<CodyDtoAll> codyDtoAll;

        try {
            codyDtoAll = Optional.ofNullable(cs.updateCodyItem(updateCody, file));
        } catch (Exception e) {
            result.status = false;
            result.message = "잘못된 정보 입력";
            result.data = null;
            responseBody = new ResponseEntity<>(result, HttpStatus.OK);
            return responseBody;
        }

        if (codyDtoAll.isPresent()) {
            result.status = true;
            result.message = "코디 수정 성공";
            result.data = codyDtoAll;

            responseBody = new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            result.status = true;
            result.message = "코디 수정 실패";
            result.data = null;
            responseBody = new ResponseEntity<>(result, HttpStatus.OK);
        }
        return responseBody;

    }

    @PutMapping(value = "/update")
    @ApiOperation(
            value = "코디 수정 - 파일은 원본 상태로",
            notes = "수정된 코드 정보를 받아서 해당 코디를 수정합니다."
    )
    public ResponseEntity<BasicResponse> updateCody(@RequestBody UpdateCody updateCody) {
        System.out.println(updateCody.getCodyId());
        ResponseEntity<BasicResponse> responseBody;

        BasicResponse result = new BasicResponse();
        Optional<CodyDtoAll> codyDtoAll;

        try {
            codyDtoAll = Optional.ofNullable(cs.updateCodyItemId(updateCody));
        } catch (Exception e) {
            result.status = false;
            result.message = "잘못된 정보 입력";
            result.data = null;
            responseBody = new ResponseEntity<>(result, HttpStatus.OK);
            return responseBody;
        }

        if (codyDtoAll.isPresent()) {
            result.status = true;
            result.message = "코디 수정 성공";
            result.data = codyDtoAll;

            responseBody = new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            result.status = true;
            result.message = "코디 수정 실패";
            result.data = null;
            responseBody = new ResponseEntity<>(result, HttpStatus.OK);
        }
        return responseBody;

    }

    @DeleteMapping(value = "/delete/{codyId}")
    @ApiOperation(
            value = "코디 삭제",
            notes = "cody_id를 받아서 해당 코디를 삭제 합니다."
    )
    public ResponseEntity<BasicResponse> deleteCody(@PathVariable(name = "codyId") final int codyId) {

        ResponseEntity<BasicResponse> responseBody;
        BasicResponse result = new BasicResponse();
        int deleteId = 0;

        try {
            deleteId = cs.deleteCodyItem(codyId);
        } catch (Exception e) {
            result.status = true;
            result.message = "코디 삭제 실패 - 존재하지 않는 코디";
            result.data = null;
            responseBody = new ResponseEntity<>(result, HttpStatus.OK);
            return responseBody;
        }

        result.status = true;
        result.message = "코디 삭제 성공";
        result.data = deleteId;
        responseBody = new ResponseEntity<>(result, HttpStatus.OK);

        return responseBody;
    }

    @GetMapping(value = "/read/{userName}")
    @ApiOperation(
            value = "코디 목록 불러오기",
            notes = "특정 유저의 코디 목록 불러오기"
    )
    public ResponseEntity<BasicResponse> readCodyList(@PathVariable(name = "userName") final String userName) {

        ResponseEntity<BasicResponse> responseBody;
        BasicResponse result = new BasicResponse();
        List<CodyDtoAll> codyDtoAlls = null;
        try {
            codyDtoAlls = cs.getUserCodyList(userName);
        } catch (Exception e) {
            result.status = false;
            result.message = "잘못된 정보 입력";
            result.data = null;

            responseBody = new ResponseEntity<>(result, HttpStatus.OK);
            return responseBody;
        }
        if (codyDtoAlls.size() == 0) {
            result.status = true;
            result.message = userName + "의 코디 목록은 비어 있음";
            result.data = null;

            responseBody = new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            result.status = true;
            result.message = userName + "의 코디 목록 불러오기 성공";
            result.data = codyDtoAlls;

            responseBody = new ResponseEntity<>(result, HttpStatus.OK);
        }
        return responseBody;
    }

}

