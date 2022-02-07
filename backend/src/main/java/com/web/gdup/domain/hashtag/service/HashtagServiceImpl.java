package com.web.gdup.domain.hashtag.service;

import com.web.gdup.domain.hashtag.dto.HashtagDto;

public interface HashtagServiceImpl {
    public String insertHashtag(HashtagDto tag);
    public HashtagDto getHashtag(String tag);
}
