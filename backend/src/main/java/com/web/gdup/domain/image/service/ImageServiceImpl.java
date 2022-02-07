package com.web.gdup.domain.image.service;

import com.web.gdup.domain.image.dto.ImageDto;

public interface ImageServiceImpl {
    public int insertImage(ImageDto image);
    public ImageDto getImage(int image_id);
}
