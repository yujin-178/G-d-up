package com.web.gdup.domain.clothing_hashtag.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClothingHashtagID implements Serializable {
    private String tagName;
    private int clothingId;
}
