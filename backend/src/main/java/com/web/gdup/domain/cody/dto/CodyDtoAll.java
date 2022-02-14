package com.web.gdup.domain.cody.dto;

import com.web.gdup.domain.image.entity.ImageEntity;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class CodyDtoAll {
    private int codyId;
    private String codyName;
    private LocalDateTime registrationDate;
    private LocalDateTime updateDate;
    private String content;
    private String userName;
    private int secret;
    private ImageEntity imageModel;
    private List<String> hashList;

}
