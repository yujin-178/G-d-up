package com.web.gdup.domain.clothing_hashtag.repository;

import com.web.gdup.domain.clothing_hashtag.entity.ClothingHashtagEntity;
import com.web.gdup.domain.clothing_hashtag.entity.ClothingHashtagID;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClothingHashtagRepository extends JpaRepository<ClothingHashtagEntity, ClothingHashtagID> {
    Optional<ClothingHashtagEntity> findByClothingIdAndTagName(int clothing_id, String tagName);
    List<ClothingHashtagEntity> findByClothingId(int clothing_id);
}
