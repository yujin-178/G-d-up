package com.web.gdup.domain.cody.dto;

import com.web.gdup.domain.cody_clothing.entity.CodyClothingEntity;
import com.web.gdup.domain.image.entity.ImageEntity;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ClothingInCodyDto {

    private int clothingId;
    private double m;
    private int x;
    private int y;
    private int z;
    private String url;

    public ClothingInCodyDto(CodyClothingEntity codyClothingEntity, ImageEntity imageEntity) {
        this.clothingId = codyClothingEntity.getClothingId();
        this.m = codyClothingEntity.getM();
        this.x = codyClothingEntity.getX();
        this.y = codyClothingEntity.getY();
        this.z = codyClothingEntity.getZ();
        this.url = imageEntity.getImageUrl();
    }
}
