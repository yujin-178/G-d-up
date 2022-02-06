package com.web.gdup.domain.clothing.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.gdup.domain.model.ImageModel;

public interface ClothingRepository extends JpaRepository<ImageModel, Integer>{
    List<ImageModel> findAll();
}