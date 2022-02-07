package com.web.gdup.domain.clothing.controller;

import com.web.gdup.domain.clothing.dto.ClothingDto;
import com.web.gdup.domain.clothing.service.ClothingServiceImpl;
import com.web.gdup.domain.image.dto.ImageDto;
import com.web.gdup.domain.image.service.ImageService;
import io.swagger.annotations.ApiOperation;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@CrossOrigin(origins = { "http://i6b108.p.ssafy.io:3000" })
@RestController
@RequestMapping("/clothing")
public class ClothingController {
    @Autowired
    ClothingServiceImpl clothingService;

    @Autowired
    ImageService imageService;

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
    public ResponseEntity<String> insertClothing(@RequestParam("imageFile") MultipartFile file, ClothingDto clothingDto) throws IOException {
        UUID uuid = UUID.randomUUID();

        String originImageName = file.getOriginalFilename();
        String imageName = uuid.toString()+"_"+originImageName;

        String savePath = "C:\\SSAFY\\download";

        String imagePath = savePath + "\\" + imageName;
        file.transferTo(new File(imagePath));

        ImageDto imageModel = ImageDto.builder()
                .image_name(originImageName)
                .new_image_name(imageName)
                .image_path(imagePath)
                .build();

        int imageId = imageService.insertImage(imageModel);
        ImageDto iDto = imageService.getImage(imageId);
        clothingService.insertClothing(clothingDto, iDto);
        return new ResponseEntity<String>("SUCESS", HttpStatus.OK);
    }

    @GetMapping("/detail/{clothing_id}")
    public ResponseEntity<ClothingDto> getClothing(@PathVariable("clothing_id") int clothing_id) {
        return new ResponseEntity<ClothingDto>(clothingService.getClothing(clothing_id), HttpStatus.OK);
    }

    @DeleteMapping("/{clothing_id}")
    public ResponseEntity<String> deleteClothing(@PathVariable("clothing_id") int clothing_id) {
        clothingService.deleteClothing(clothing_id);
        return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
    }
}
