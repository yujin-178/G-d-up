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
public class CreateCodyResponse {

    private String userName;
    private String codyName;
    private String content;
    private int secret;
    private List<String> codyTag;
    private ImageEntity imageEntity;
    private LocalDateTime registrationTime;
    private LocalDateTime updateDate;

}
