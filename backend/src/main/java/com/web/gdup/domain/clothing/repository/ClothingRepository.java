package com.web.gdup.domain.clothing.repository;

import com.web.gdup.domain.clothing.entity.ClothingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClothingRepository extends JpaRepository<ClothingEntity, Integer>{
    List<ClothingEntity> findAllByUserName(String userName);
}