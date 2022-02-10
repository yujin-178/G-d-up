package com.web.gdup.domain.feed.dto;

import com.web.gdup.domain.cody.entity.CodyEntity;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RecommandDto {

    private CodyEntity codyEntity;

    private int like;
}
