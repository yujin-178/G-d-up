package com.web.gdup.domain.clothing_washing.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ClothingWashingId implements Serializable {
    private int clothingid;
    private int washingMethod;
}
