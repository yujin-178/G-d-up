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
        return imageRepository.save(image).getImage_id();
    }

    @Override
    @Transactional
    public ImageDto getImage(int image_id) {
        ImageDto imageModel = imageRepository.findById(image_id).get();

//        ImageDto imageDto = ImageDto.builder()
//                .image_id(image_id)
//                .image_name(imageModel.getImage_name())
//                .new_image_name(imageModel.getNew_image_name())
//                .image_path(imageModel.getImage_path())
//                .build();
        return imageModel;
    }
}
