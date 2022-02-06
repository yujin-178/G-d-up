package com.web.gdup.domain.feed.service;

import com.web.gdup.domain.feed.dto.FeedDto;

import java.util.Optional;

public interface FeedService {

    FeedDto getFeed(int feed_id);
    Optional<FeedDto> getAllFeed();
    boolean insertFeed();
    boolean deleteFeed();
    FeedDto modifyFeed();
}
