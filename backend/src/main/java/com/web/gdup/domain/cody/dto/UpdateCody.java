package com.web.gdup.domain.cody.dto;

import com.web.gdup.domain.cody.entity.CodyEntity;
import com.web.gdup.domain.image.entity.ImageEntity;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UpdateCody {
    private int codyId;
    private String userName;
    private String codyName;
    private String content;
    private int secret;
    private String codyTag;
    private List<ClothingInCody> clothingList;

    public CodyEntity toEntity(ImageEntity imageEntity){
        CodyEntity build = CodyEntity.builder()
                .codyId(getCodyId())
                .codyName(getCodyName())
                .registrationDate(LocalDateTime.now())
                .updateDate(LocalDateTime.now())
                .content(getContent())
                .userName(getUserName())
                .secret(getSecret())
                .imageModel(imageEntity)
                .build();
        return build;
    }
}
