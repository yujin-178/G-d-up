package com.web.gdup.domain.clothing.entity;

import com.web.gdup.domain.image.entity.ImageEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name = "clothing")
@Builder
@EntityListeners(AuditingEntityListener.class)
public class ClothingEntity {
    @Id
    @Column(name = "clothingid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    private ImageEntity imageModel;

    @Column(name = "username")
    private String userName;

    public void mapImage(ImageEntity image) {
        this.imageModel = image;
    }
}
