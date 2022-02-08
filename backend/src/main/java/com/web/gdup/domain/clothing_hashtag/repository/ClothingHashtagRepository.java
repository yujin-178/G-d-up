package com.web.gdup.domain.clothing_hashtag.repository;

import com.web.gdup.domain.clothing_hashtag.dto.ClothingHashtagDto;
import com.web.gdup.domain.clothing_hashtag.dto.ClothingHashtagID;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClothingHashtagRepository extends JpaRepository<ClothingHashtagDto, ClothingHashtagID> {
    Optional<ClothingHashtagDto> findByClothingIdAndTagName(int clothing_id, String tagName);
    List<ClothingHashtagDto> findByClothingId(int clothing_id);
}
