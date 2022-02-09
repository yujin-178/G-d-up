package com.web.gdup.domain.clothing_washing.service;

import java.util.List;

public interface ClothingWashingServiceImpl {
    void insertClothingWashing(int clothingId, String[] str);
    List<String> getWashingMethods(int clothing_id);
}
