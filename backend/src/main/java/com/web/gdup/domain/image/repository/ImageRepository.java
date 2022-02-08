package com.web.gdup.domain.image.repository;

import com.web.gdup.domain.image.entity.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<ImageEntity, Integer> {

}
