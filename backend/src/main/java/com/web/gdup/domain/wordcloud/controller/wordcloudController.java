package com.web.gdup.domain.wordcloud.controller;

import com.web.gdup.domain.wordcloud.dto.wordDto;
import com.web.gdup.domain.wordcloud.service.wordService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = {"http://i6b108.p.ssafy.io:3000"})
@RestController
@RequestMapping("/word")
public class wordcloudController {
    @Autowired
    private wordService ws;

    @GetMapping("/list")
    @ApiOperation(
            value = "tag word 리스트 가져오기",
            notes = "최신 태그 리스트를 가져온다."
    )
    public ResponseEntity<List<Object[]>> getList() {
        return new ResponseEntity<>(ws.getList(), HttpStatus.OK);
    }

}
