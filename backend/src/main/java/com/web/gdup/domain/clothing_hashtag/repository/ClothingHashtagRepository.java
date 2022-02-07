package com.web.gdup.domain.clothing_hashtag.repository;

import com.web.gdup.domain.clothing_hashtag.dto.ClothingHashtagDto;
import com.web.gdup.domain.clothing_hashtag.dto.ClothingHashtagID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClothingHashtagRepository extends JpaRepository<ClothingHashtagDto, ClothingHashtagID> {
}
