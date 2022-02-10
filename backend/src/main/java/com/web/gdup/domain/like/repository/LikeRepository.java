package com.web.gdup.domain.like.repository;

import com.web.gdup.domain.like.entity.LikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<LikeEntity, Integer> {
    Optional<LikeEntity> findByFeedIdAndUserName(int feedId, String userName);

    @Query(value = "select count(userName) from likes where feedId = :feedNo",
    nativeQuery = true)
    int getLikeCnt(@Param("feedNo") int feedId);

    @Query(value = "select userName from likes where feedId = :feedNo",
    nativeQuery = true)
    List<String> findUsers(@Param("feedNo") int feedId);
}
