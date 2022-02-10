package com.web.gdup.domain.washing_method.dto;

import com.web.gdup.domain.washing_method.entity.WashingMethodEntity;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Getter
@Setter
public class WashingMethodDto {
    private int id;
    private String method;

    public WashingMethodEntity toEntity() {
        WashingMethodEntity build = WashingMethodEntity.builder()
                .id(id)
                .method(method)
                .build();
        return build;
    }
}
