package com.web.gdup.domain.washing_method.service;

import com.web.gdup.domain.washing_method.dto.WashingMethodDto;
import com.web.gdup.domain.washing_method.entity.WashingMethodEntity;
import com.web.gdup.domain.washing_method.repository.WashingMethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WashingMethodServiceImpl implements WashingMethodService{
    @Autowired
    WashingMethodRepository washingMethodRepository;

    @Override
    public WashingMethodDto getWashingMethod(int id) {
        WashingMethodEntity washingMethod = washingMethodRepository.getOne(id);

        WashingMethodDto washingMethodDto = WashingMethodDto.builder()
                .id(washingMethod.getId())
                .method(washingMethod.getMethod())
                .build();
        return washingMethodDto;
    }
}
