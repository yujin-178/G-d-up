package com.web.gdup.domain.model;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ImageDto {
    private int image_id;
    private String image_name;
    private String new_image_name;
    private String image_path;

    @Builder
    public ImageDto(int image_id, String image_name, String new_image_name, String image_path) {
        this.image_id = image_id;
        this.image_name = image_name;
        this.new_image_name = new_image_name;
        this.image_path = image_path;
    }

    public ImageModel toEntity() {
        ImageModel build = ImageModel.builder()
                .image_id(image_id)
                .image_name(image_name)
                .new_image_name(new_image_name)
                .image_path(image_path)
                .build();
        return build;
    }
}
