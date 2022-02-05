package com.web.gdup.domain.clothing.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.web.gdup.domain.model.ImageModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@ToString
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "clothing")
public class ClothingDto {
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
    private String meterial;
    private String neckline;
    private String pattern;
    private String sleeves;
    private String style;
    private String subcategory;
    private String season;
    private String registration_date;

    @OneToOne
    @JoinColumn(name = "image_id", referencedColumnName = "image_id")
    private ImageModel imageModel;

    private String user_name;
}
