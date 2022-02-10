package com.web.gdup.domain.image.service;

import com.web.gdup.domain.image.dto.ImageDto;

public interface ImageService {
    public int insertImage(ImageDto image);
    public ImageDto getImage(int imageId);
}
