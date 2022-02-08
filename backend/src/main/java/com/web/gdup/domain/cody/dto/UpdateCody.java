package com.web.gdup.domain.cody.dto;

import lombok.*;

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

}
