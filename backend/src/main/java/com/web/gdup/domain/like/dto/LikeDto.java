package com.web.gdup.domain.like.dto;

import com.web.gdup.domain.like.entity.LikeEntity;
import lombok.*;



@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LikeDto {
    private int feedId;

    private String userName;

    public LikeEntity toEntity(){
        LikeEntity build = LikeEntity.builder()
                .feedId(feedId)
                .userName(userName)
                .build();
        return  build;
    }
}
