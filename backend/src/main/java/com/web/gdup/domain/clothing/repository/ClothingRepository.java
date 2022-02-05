package com.web.gdup.domain.clothing.repository;

import com.web.gdup.domain.clothing.dto.ClothingDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClothingRepository extends JpaRepository<ClothingDto, Integer>{
}