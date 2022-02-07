package com.web.gdup.domain.image.service;

import com.web.gdup.domain.image.dto.ImageDto;
import com.web.gdup.domain.image.repository.ImageRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class ImageService implements ImageServiceImpl{
    private ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Override
    @Transactional
    public int insertImage(ImageDto image) {
        return imageRepository.save(image).getImageId();
    }

    @Override
    @Transactional
    public ImageDto getImage(int imageId) {
        ImageDto imageModel = imageRepository.findById(imageId).get();
        return imageModel;
    }
}
