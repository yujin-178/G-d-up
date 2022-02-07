package com.web.gdup.domain.clothing.service;

import com.web.gdup.domain.clothing.dto.ClothingDto;
import com.web.gdup.domain.model.ImageDto;
import org.json.simple.parser.ParseException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ClothingServiceImpl {
    String getTag(MultipartFile file) throws IOException;
    String getRemoveBg(MultipartFile file) throws IOException, ParseException;
    public int insertClothing(ClothingDto clothingDto, ImageDto imageDto);
    public ClothingDto getClothing(int id);
    void deleteClothing(int clothing_id);
}
