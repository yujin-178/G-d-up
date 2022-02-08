package com.web.gdup.domain.hashtag.service;

import com.web.gdup.domain.hashtag.entity.HashtagEntity;

public interface HashtagServiceImpl {
    public String insertHashtag(HashtagEntity tag);
    public HashtagEntity getHashtag(String tag);
}
