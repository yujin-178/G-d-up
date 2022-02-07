package com.web.gdup.domain.clothing.repository;

import com.web.gdup.domain.clothing.dto.ClothingDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClothingRepository extends JpaRepository<ClothingDto, Integer>{
    List<ClothingDto> findByUserName(String user_name);
}