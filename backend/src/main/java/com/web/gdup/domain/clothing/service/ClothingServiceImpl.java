package com.web.gdup.domain.clothing.service;

import org.json.simple.parser.ParseException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ClothingServiceImpl {
    String getTag(MultipartFile file) throws IOException;
    String getRemoveBg(MultipartFile file) throws IOException, ParseException;
}
