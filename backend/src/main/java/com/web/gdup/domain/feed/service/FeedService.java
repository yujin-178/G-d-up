package com.web.gdup.domain.feed.service;

import com.web.gdup.domain.cody.entity.CodyEntity;
import com.web.gdup.domain.feed.dto.FeedDto;
import com.web.gdup.domain.feed.dto.RecommandDto;

import java.util.List;
import java.util.Optional;

public interface FeedService {

    Optional<FeedDto> getFeed(int feedId);
    List<FeedDto> getAllFeed(String userName);
    boolean insertFeed(FeedDto feed);
    boolean deleteFeed(int feedId);
    FeedDto modifyFeed(FeedDto feed);
    public  List<RecommandDto> recommendService (String tagName);
}
