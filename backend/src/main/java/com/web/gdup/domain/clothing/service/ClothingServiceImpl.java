package com.web.gdup.domain.clothing.service;

import com.web.gdup.domain.clothing.dto.ClothingDto;
import org.json.simple.parser.ParseException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ClothingServiceImpl {
    String getTag(MultipartFile file) throws IOException;
    String getRemoveBg(MultipartFile file) throws IOException, ParseException;
    public int insertClothing(MultipartFile file, ClothingDto clothing);
    public ClothingDto getClothing(int id);
    void deleteClothing(int clothing_id);
    List<ClothingDto> getUserClothing(String user_name);
}
