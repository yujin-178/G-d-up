package com.web.gdup.domain.clothing.service;

import com.web.gdup.domain.clothing.dto.ClothingDto;
import com.web.gdup.domain.clothing.entity.ClothingEntity;
import org.json.simple.parser.ParseException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public interface ClothingServiceImpl {
    public HashMap<String, String> getTag(MultipartFile file) throws IOException;
    public String getRemoveBg(MultipartFile file) throws IOException, ParseException;
    public int insertClothing(MultipartFile file, ClothingDto clothing, String hashtag);
    public HashMap<String, Object> getClothing(int id);
    public Optional<ClothingEntity> deleteClothing(int clothing_id);
    public List<HashMap<String, Object>> getUserClothing(String user_name);
}
