package com.web.gdup.domain.clothing.dto;

import com.web.gdup.domain.image.dto.ImageDto;
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
public class ClothingDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cothingid")
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
    @CreatedDate
    @Column(name = "registrationdate")
    private LocalDateTime registrationDate;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "imageid")
    private ImageDto imageModel;

    @Column(name = "username")
    private String userName;

    @Builder
    public ClothingDto(int clothingId, String age, String color, String cut, String design, String gender, String hood, String layers, String length, String material, String neckline, String pattern, String sleeves, String style, String subcategory, String season, ImageDto imageModel, String userName, LocalDateTime registrationDate) {
        this.clothingId = clothingId;
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
        this.registrationDate = registrationDate;
        this.imageModel = imageModel;
        this.userName = userName;
    }

    public void mapImage(ImageDto image) { this.imageModel = image; }
}
