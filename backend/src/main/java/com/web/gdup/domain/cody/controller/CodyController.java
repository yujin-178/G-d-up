package com.web.gdup.domain.cody.controller;

import com.web.gdup.domain.cody.dto.CreateCody;
import com.web.gdup.domain.cody.entity.CodyDto;
import com.web.gdup.domain.cody.service.CodyServiceImpl;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://i6b108.p.ssafy.io:3000"})
@RestController("/cody")
public class CodyController {

    @Autowired
    private CodyServiceImpl cs;

    @GetMapping(value = "/testHello")
    @ApiOperation(
            value = "코디 동작 확인",
            notes = "요청하는 경우 Hello 문자열을 반환한다."
    )
    public ResponseEntity<String> testHello() {
        return new ResponseEntity<String>("Hello", HttpStatus.OK);
    }


    @PostMapping(value = "/addCody/{userId}")
    @ApiOperation(
            value = "코디 추가",
            notes = "코디의 사진, 태크 정보를 받아서 새로운 코디를 만든다."
    )
    public ResponseEntity<String> createCody(@PathVariable(name = "userId") String id, @RequestBody CreateCody cc) {
        ResponseEntity<String> re;

        if (cs.addCodyItem(cc, id) == 1)
            re = new ResponseEntity<>("Cody 생성 성공", HttpStatus.OK);
        else
            re = new ResponseEntity<>("Cody 생성 실패", HttpStatus.BAD_REQUEST);

        return re;
    }

    @PutMapping(value = "/update/{userId}/{codeId}")
    @ApiOperation(
            value = "코디 수정",
            notes = "cody_id를 받아서 해당 코디를 수정합니다."
    )
    public ResponseEntity<String> updateCody(@PathVariable(name = "codyId") String codyId, @PathVariable(name="userId") String userId, @RequestBody CreateCody cc) {

        return new ResponseEntity<String>("수정 성공", HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{cody_id}")
    @ApiOperation(
            value = "코디 삭제",
            notes = "cody_id를 받아서 해당 코디를 삭제 합니다."
    )
    public ResponseEntity<String> deleteCody(@PathVariable(name = "cody_id") String cody_id) {
        return new ResponseEntity<String>("결과" + cs.deleteCodyItem(cody_id), HttpStatus.OK);
    }

    @GetMapping(value = "/list/{user_id}")
    @ApiOperation(
            value = "코디 목록 불러오기",
            notes = "특정 유저의 코디 목록 불러오기"
    )
    public ResponseEntity<List<CodyDto>> readCodyList(@PathVariable(name = "user_id") String id) {
        return new ResponseEntity<List<CodyDto>>(cs.getUserCodyList(id), HttpStatus.OK);
    }

}
