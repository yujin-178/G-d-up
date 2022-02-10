package com.web.gdup.domain.clothing_washing.dto;

import com.web.gdup.domain.clothing_washing.entity.ClothingWashingEntity;
import com.web.gdup.domain.washing_method.entity.WashingMethodEntity;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Getter
@Setter
public class ClothingWashingDto {
    private int clothingid;
    private WashingMethodEntity washingMethod;

    public ClothingWashingEntity toEntity() {
        ClothingWashingEntity build = ClothingWashingEntity.builder()
                .clothingid(clothingid)
                .washingMethod(washingMethod)
                .build();
        return build;
    }
}
