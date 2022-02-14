package com.web.gdup.domain.cody.dto;

import com.web.gdup.domain.cody.entity.CodyEntity;
import com.web.gdup.domain.image.entity.ImageEntity;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class CodyAllList {
    private CodyEntity codyEntity;
    private List<String> hashList;
}