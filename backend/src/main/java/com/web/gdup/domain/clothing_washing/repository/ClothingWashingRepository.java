package com.web.gdup.domain.clothing_washing.repository;

import com.web.gdup.domain.clothing_washing.entity.ClothingWashingEntity;
import com.web.gdup.domain.clothing_washing.entity.ClothingWashingId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClothingWashingRepository extends JpaRepository<ClothingWashingEntity, ClothingWashingId> {
    List<ClothingWashingEntity> findByClothingid(int clothing_id);
}
