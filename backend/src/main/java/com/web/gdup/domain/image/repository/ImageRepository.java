package com.web.gdup.domain.image.repository;

import com.web.gdup.domain.image.dto.ImageModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<ImageModel, Integer> {

}
