package com.web.gdup.domain.clothing_hashtag.service;

import com.web.gdup.domain.clothing_hashtag.dto.ClothingHashtagDto;

import java.util.List;
import java.util.Set;

public interface ClothingHashtagServiceImpl {
    public void insertHashtags(int clothing_id, Set<String> hashtags);
    List<ClothingHashtagDto> getHashtags(int clothing_id);
}
