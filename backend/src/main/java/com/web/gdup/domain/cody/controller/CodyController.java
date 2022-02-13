package com.web.gdup.domain.cody.controller;

import com.web.gdup.domain.cody.dto.CreateCody;
import com.web.gdup.domain.cody.dto.UpdateCody;
import com.web.gdup.domain.cody.entity.CodyEntity;
import com.web.gdup.domain.cody.service.CodyServiceImpl;
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
    public ResponseEntity<String> createCody(@RequestPart(value = "imageFile") MultipartFile file, @RequestPart(value = "createCody") CreateCody cc) {
        ResponseEntity<String> re;

        System.out.println(cc.toString());
        System.out.println(file.getOriginalFilename());

        if (cs.addCodyItem(cc, file) == 1)
            re = new ResponseEntity<>("Cody 생성 성공", HttpStatus.OK);
        else
            re = new ResponseEntity<>("Cody 생성 실패", HttpStatus.BAD_REQUEST);

        return re;
    }


    @PutMapping(value = "/update")
    @ApiOperation(
            value = "코디 수정",
            notes = "수정된 코드 정보를 받아서 해당 코디를 수정합니다."
    )
    public ResponseEntity<String> updateCody(@RequestPart(value = "imageFile") MultipartFile file, @RequestPart(value = "updateCody") UpdateCody uc) {
        System.out.println(uc.getCodyId());
        System.out.println(file.getOriginalFilename());
        if (cs.updateCodyItem(uc, file) == 1)
            return new ResponseEntity<String>("수정 성공", HttpStatus.OK);
        else
            return new ResponseEntity<String>("수정 실패", HttpStatus.NOT_FOUND);

    }

    @DeleteMapping(value = "/delete/{codyId}")
    @ApiOperation(
            value = "코디 삭제",
            notes = "cody_id를 받아서 해당 코디를 삭제 합니다."
    )
    public ResponseEntity<String> deleteCody(@PathVariable(name = "codyId") int cody_id) {
        if (cs.deleteCodyItem(cody_id) == 1)
            return new ResponseEntity<String>("코디 삭제 성공", HttpStatus.OK);
        else
            return new ResponseEntity<String>("코디 삭제 실패", HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/read/{userName}")
    @ApiOperation(
            value = "코디 목록 불러오기",
            notes = "특정 유저의 코디 목록 불러오기"
    )
    public ResponseEntity<List<CodyEntity>> readCodyList(@PathVariable(name = "userName") String userName) {
        return new ResponseEntity(cs.getUserCodyList(userName), HttpStatus.OK);
    }

}

