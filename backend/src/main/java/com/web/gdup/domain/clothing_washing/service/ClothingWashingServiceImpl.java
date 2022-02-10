package com.web.gdup.domain.clothing_washing.service;

import com.web.gdup.domain.clothing_washing.dto.ClothingWashingDto;
import com.web.gdup.domain.clothing_washing.entity.ClothingWashingEntity;
import com.web.gdup.domain.clothing_washing.repository.ClothingWashingRepository;
import com.web.gdup.domain.washing_method.dto.WashingMethodDto;
import com.web.gdup.domain.washing_method.service.WashingMethodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ClothingWashingServiceImpl implements ClothingWashingService{
    @Autowired
    private ClothingWashingRepository  clothingWashingRepository;
    @Autowired
    private WashingMethodService washingMethodService;

    @Override
    public void insertClothingWashing(int clothingId, String[] str) {
        String[] setStr = Arrays.stream(str).distinct().toArray(String[]::new);

        for(String s : setStr) {

            WashingMethodDto washing = washingMethodService.getWashingMethod(Integer.parseInt(s));
            ClothingWashingDto clothingWashingDto = ClothingWashingDto.builder()
                    .clothingid(clothingId)
                    .washingMethod(washing.toEntity())
                    .build();
            clothingWashingRepository.save(clothingWashingDto.toEntity());
        }
    }

    @Override
    public List<ClothingWashingDto> getWashingMethods(int clothing_id) {
        List<ClothingWashingDto> result = new ArrayList<>();
        List<ClothingWashingEntity> methods = clothingWashingRepository.findByClothingid(clothing_id);
        for(ClothingWashingEntity method : methods) {
            result.add(buildClothingWashingDto(method));
        }
        return result;
    }

    public ClothingWashingDto buildClothingWashingDto(ClothingWashingEntity cw) {
        ClothingWashingDto clothingWashingDto = ClothingWashingDto.builder()
                .clothingid(cw.getClothingid())
                .washingMethod(cw.getWashingMethod())
                .build();
        return clothingWashingDto;
    }
}
