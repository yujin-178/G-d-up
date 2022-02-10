package com.web.gdup.domain.like.repository;

import com.web.gdup.domain.like.entity.LikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<LikeEntity, Integer> {
    Optional<LikeEntity> findByFeedIdAndUserName(int feedId, String userName);
}
