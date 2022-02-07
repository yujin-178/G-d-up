package com.web.gdup.domain.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "image")
public class ImageModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int image_id;

    private String image_name;

    private String new_image_name;

    private String image_path;

    @Builder
    public ImageModel(int image_id, String image_name, String new_image_name, String image_path) {
        this.image_id = image_id;
        this.image_name = image_name;
        this.new_image_name = new_image_name;
        this.image_path = image_path;
    }
}