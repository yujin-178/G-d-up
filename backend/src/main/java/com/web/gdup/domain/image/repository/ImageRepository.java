package com.web.gdup.domain.image.repository;

import com.web.gdup.domain.image.dto.ImageDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<ImageDto, Integer> {

}
