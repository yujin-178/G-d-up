package com.web.gdup.domain.feed.repository;

import com.web.gdup.domain.feed.dto.FeedDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedRepository extends JpaRepository<FeedDto, Integer> {
    List<FeedDto> findByUserName(String userName);
}
