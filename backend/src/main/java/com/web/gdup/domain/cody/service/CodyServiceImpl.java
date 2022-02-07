package com.web.gdup.domain.cody.service;


import com.web.gdup.domain.cody.entity.CodyDto;
import com.web.gdup.domain.cody.repository.CodyRepository;
import com.web.gdup.domain.image.dto.ImageDto;
import com.web.gdup.domain.image.service.ImageService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class CodyServiceImpl implements CodyService {
    @Autowired
    private CodyRepository cr;

    @Override
    public List<CodyDto> getAllCodyList() {
        return cr.findAll();
    }

    @Override
    public List<CodyDto> getUserCodyList(String id) {
        return cr.findAllByUserName(id);
    }

    @Override
    public int deleteCodyItem(String id) {
        return cr.deleteByCodyId(id);
    }

    @Override
    public int addCodyItem(CodyDto codyDto, MultipartFile inputImage) throws IOException, ParseException {
        UUID uuid = UUID.randomUUID();

        String originImageName = inputImage.getOriginalFilename();
        String imageSavedName = uuid.toString()+"_"+originImageName;

        String savePath = "C:\\SSAFY\\download";
        String imagePath = savePath + "\\" + imageSavedName;
        try {
            inputImage.transferTo(new File(imagePath));
        } catch (IOException e) {
            e.printStackTrace();
        }

        ImageDto image = ImageDto.builder()
                .imageName(originImageName)
                .newImageName(imageSavedName)
                .imagePath(imagePath)
                .build();

        return 1;
    }



}



