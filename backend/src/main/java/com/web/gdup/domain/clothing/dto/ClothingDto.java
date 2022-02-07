package com.web.gdup.domain.clothing.dto;

import com.web.gdup.domain.clothing.entity.ClothingEntity;
import com.web.gdup.domain.image.dto.ImageModel;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ClothingDto {
    private int clothing_id;
    private String age;
    private String color;
    private String cut;
    private String design;
    private String gender;
    private String hood;
    private String layers;
    private String length;
    private String material;
    private String neckline;
    private String pattern;
    private String sleeves;
    private String style;
    private String subcategory;
    private String season;
    private LocalDateTime registration_date;
    private ImageModel imageModel;
    private String user_name;

    @Builder
    public ClothingDto(int clothing_id, String age, String color, String cut, String design, String gender, String hood, String layers, String length, String material, String neckline, String pattern, String sleeves, String style, String subcategory, String season, LocalDateTime registration_date, ImageModel imageModel, String user_name) {
        this.clothing_id = clothing_id;
        this.age = age;
        this.color = color;
        this.cut = cut;
        this.design = design;
        this.gender = gender;
        this.hood = hood;
        this.layers = layers;
        this.length = length;
        this.material = material;
        this.neckline = neckline;
        this.pattern = pattern;
        this.sleeves = sleeves;
        this.style = style;
        this.subcategory = subcategory;
        this.season = season;
        this.registration_date = registration_date;
        this.imageModel = imageModel;
//        this.image_id = image_id;
        this.user_name = user_name;
    }

    public ClothingEntity toEntity() {
        ClothingEntity build = ClothingEntity.builder()
                .clothing_id(clothing_id)
                .age(age)
                .color(color)
                .cut(cut)
                .design(design)
                .gender(gender)
                .hood(hood)
//                .image_id(image_id)
                .layers(layers)
                .length(length)
                .material(material)
                .neckline(neckline)
                .pattern(pattern)
                .season(season)
                .sleeves(sleeves)
                .style(style)
                .subcategory(subcategory)
                .user_name(user_name)
                .imageModel(imageModel)
                .build();
        return build;
    }
}
