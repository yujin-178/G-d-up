package com.web.gdup.domain.feed.service;

import com.web.gdup.domain.feed.dto.FeedDto;

import java.util.List;

public interface FeedService {

    FeedDto getFeed(int feed_id);
    List<FeedDto> getAllFeed();
    boolean insertFeed(FeedDto feed);
    boolean deleteFeed(int feedId);
    FeedDto modifyFeed(FeedDto feed);
}
