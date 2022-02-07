package com.web.gdup.domain.clothing.dto;

import com.web.gdup.domain.image.dto.ImageDto;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "clothing")
@Builder
@EntityListeners(AuditingEntityListener.class)
public class ClothingDto {
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
    private ImageDto imageModel;

    @Column(name = "username")
    private String userName;

    public void mapImage(ImageDto image) {
        this.imageModel = image;
    }
}
