package com.web.gdup.domain.clothing.service.dto;

import com.web.gdup.domain.image.entity.ImageEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ClothingResponse {
    private int clothingId;
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
    private LocalDateTime registrationDate;
    private ImageEntity imageModel;
    private String userName;
    private String category;
    private String topcategory;
    private String fit;
}
