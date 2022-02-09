package com.web.gdup.domain.feed.repository;

import com.web.gdup.domain.feed.dto.FeedDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedRepository extends JpaRepository<FeedDto, Integer> {
    List<FeedDto> findByUserName(String userName);

    @Query(value = "select * from feeds where following  ")
    List<FeedDto> findFollowingFeeds(@Param("loginName") String userName);
}
