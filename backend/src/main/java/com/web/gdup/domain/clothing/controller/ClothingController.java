package com.web.gdup.domain.clothing.controller;

import com.web.gdup.domain.clothing.dto.ClothingDto;
import com.web.gdup.domain.clothing.service.ClothingServiceImpl;
import io.swagger.annotations.ApiOperation;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = { "http://i6b108.p.ssafy.io:3000" })
@RestController
@RequestMapping("/clothing")
public class ClothingController {
    @Autowired
    ClothingServiceImpl clothingService;

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
    public ResponseEntity<String> insertClothing(@RequestParam("imageFile") MultipartFile file, ClothingDto clothing) throws IOException {
        clothingService.insertClothing(file, clothing);
        return new ResponseEntity<String>("SUCESS", HttpStatus.OK);
    }

    @GetMapping("/detail/{clothingId}")
    @ApiOperation(value = "옷 상세보기")
    public ResponseEntity<ClothingDto> getClothing(@PathVariable("clothingId") int clothingId) {
        return new ResponseEntity<ClothingDto>(clothingService.getClothing(clothingId), HttpStatus.OK);
    }

    @GetMapping("/list/{userName}")
    @ApiOperation(value = "옷 리스트 - 사용자 id 필요")
    public ResponseEntity<List<ClothingDto>> getAllClothing(@PathVariable("userName") String userName) {
        return new ResponseEntity<List<ClothingDto>>(clothingService.getUserClothing(userName), HttpStatus.OK);
    }

    @DeleteMapping("/{clothingId}")
    @ApiOperation(value = "옷 삭제")
    public ResponseEntity<String> deleteClothing(@PathVariable("clothingId") int clothingId) {
        clothingService.deleteClothing(clothingId);
        return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
    }
}