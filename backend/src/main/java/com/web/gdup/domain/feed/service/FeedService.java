package com.web.gdup.domain.feed.service;

import com.web.gdup.domain.feed.dto.FeedDto;
import com.web.gdup.domain.feed.dto.RecommandDto;

import java.util.List;
import java.util.Optional;

public interface FeedService {

    Optional<FeedDto> getFeed(int feedId);
    List<FeedDto> getAllFeed(String userName) throws Exception;
    boolean insertFeed(FeedDto feed) throws Exception;
    boolean deleteFeed(int feedId) throws Exception;
    FeedDto modifyFeed(FeedDto feed) throws Exception;
    public  List<RecommandDto> recommendService (String tagName);
}
