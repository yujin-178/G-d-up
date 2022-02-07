package com.web.gdup.domain.clothing.entity;

import com.web.gdup.domain.image.dto.ImageModel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Table(name = "clothing")
@EntityListeners(AuditingEntityListener.class)
public class ClothingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @CreatedDate
    private LocalDateTime registration_date;

//    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "")
    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "image_id")
    private ImageModel imageModel;
//    private int image_id;
    private String user_name;

    @Builder
    public ClothingEntity(int clothing_id, String age, String color, String cut, String design, String gender, String hood, String layers, String length, String material, String neckline, String pattern, String sleeves, String style, String subcategory, String season, ImageModel imageModel, String user_name) {
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
//        this.registration_date = registration_date;
        this.imageModel = imageModel;
        this.user_name = user_name;
    }

    public void mapImage(ImageModel image) { this.imageModel = image; }
}
