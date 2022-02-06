package com.web.gdup.domain.feed.repository;

import com.web.gdup.domain.feed.dto.FeedDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedRepository extends JpaRepository<FeedDto, Integer> {

}
