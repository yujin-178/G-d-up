package com.web.gdup.domain.clothing.service;

import com.web.gdup.domain.clothing.dto.ClothingDto;
import org.json.simple.parser.ParseException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ClothingServiceImpl {
    public String getTag(MultipartFile file) throws IOException;
    public String getRemoveBg(MultipartFile file) throws IOException, ParseException;
    public int insertClothing(MultipartFile file, ClothingDto clothing, String hashtag);
    public ClothingDto getClothing(int id);
    public void deleteClothing(int clothing_id);
    public List<ClothingDto> getUserClothing(String user_name);
}
