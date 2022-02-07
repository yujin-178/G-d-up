package com.web.gdup.domain.model;

import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class ImageService {
    private ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Transactional
    public int insertImage(ImageDto imageDto) {
        return imageRepository.save(imageDto.toEntity()).getImage_id();
    }

    @Transactional
    public ImageDto getImage(int image_id) {
        ImageModel imageModel = imageRepository.findById(image_id).get();

        ImageDto imageDto = ImageDto.builder()
                .image_id(image_id)
                .image_name(imageModel.getImage_name())
                .new_image_name(imageModel.getNew_image_name())
                .image_path(imageModel.getImage_path())
                .build();
        return imageDto;
    }
}
