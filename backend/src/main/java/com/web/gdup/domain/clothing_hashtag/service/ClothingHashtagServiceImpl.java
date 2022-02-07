package com.web.gdup.domain.clothing_hashtag.service;

import java.util.Set;

public interface ClothingHashtagServiceImpl {
    public void insertHashtags(int clothing_id, Set<String> hashtags);
}
