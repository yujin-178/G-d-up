package com.web.gdup.domain.image.repository;

import com.web.gdup.domain.image.entity.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

public interface ImageRepository extends JpaRepository<ImageEntity, Integer> {
    @Transactional
    int deleteByImageId(int id);
}
