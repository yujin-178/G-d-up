package com.web.gdup.domain.clothing_hashtag.dto;

import com.web.gdup.domain.clothing_hashtag.entity.ClothingHashtagEntity;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Getter
public class ClothingHashtagDto implements Serializable {
    private String tagName;
    private int clothingId;
    private LocalDateTime registrationDate;

    public ClothingHashtagEntity toEntity() {
        ClothingHashtagEntity build = ClothingHashtagEntity.builder()
                .clothingId(clothingId)
                .tagName(tagName)
                .registrationDate(registrationDate)
                .build();
        return build;
    }
}
