package com.web.gdup.domain.image.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.web.gdup.domain.image.entity.ImageEntity;
import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ImageDto {
    private int imageId;
    private String imageName;
    private String newImageName;
    private String imagePath;

    @Builder
    public ImageDto(int imageId, String imageName, String newImageName, String imagePath) {
        this.imageId = imageId;
        this.imageName = imageName;
        this.newImageName = newImageName;
        this.imagePath = imagePath;
    }

    public ImageEntity toEntity() {
        ImageEntity build = ImageEntity.builder()
                .imageId(imageId)
                .imageName(newImageName)
                .newImageName(newImageName)
                .imagePath(imagePath)
                .build();
        return build;
    }

}