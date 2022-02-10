package com.web.gdup.domain.image.service;

import com.web.gdup.domain.image.dto.ImageDto;
import com.web.gdup.domain.image.entity.ImageEntity;
import com.web.gdup.domain.image.repository.ImageRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class ImageServiceImpl implements ImageService{
    private ImageRepository imageRepository;

    public ImageServiceImpl(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Override
    @Transactional
    public int insertImage(ImageDto image) {
        return imageRepository.save(image.toEntity()).getImageId();
    }

    @Override
    @Transactional
    public ImageDto getImage(int imageId) {
        ImageEntity image = imageRepository.findById(imageId).get();

        ImageDto imageDto = ImageDto.builder()
                .imageId(imageId)
                .imageName(image.getImageName())
                .newImageName(image.getNewImageName())
                .build();
        return imageDto;
    }
}
