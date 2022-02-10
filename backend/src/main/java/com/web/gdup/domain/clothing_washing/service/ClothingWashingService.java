package com.web.gdup.domain.clothing_washing.service;

import com.web.gdup.domain.clothing_washing.dto.ClothingWashingDto;

import java.util.List;

public interface ClothingWashingService {
    void insertClothingWashing(int clothingId, String[] str);
    List<ClothingWashingDto> getWashingMethods(int clothing_id);
}
