package com.web.gdup.domain.clothing_hashtag.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ClothingHashtagID implements Serializable {
    private String tagName;
    private int clothingId;
}
