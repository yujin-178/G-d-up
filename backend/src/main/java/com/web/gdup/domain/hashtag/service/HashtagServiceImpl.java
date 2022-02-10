package com.web.gdup.domain.hashtag.service;

import com.web.gdup.domain.hashtag.entity.HashtagEntity;
import com.web.gdup.domain.hashtag.repository.HashtagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HashtagServiceImpl implements HashtagService{
    @Autowired
    private HashtagRepository hashtagRepository;

    @Override
    public String insertHashtag(HashtagEntity tag) {
        return hashtagRepository.save(tag).getTagName();
    }

    @Override
    public HashtagEntity getHashtag(String tag) {
        return hashtagRepository.getOne(tag);
    }

    @Override
    public HashtagEntity findOrCreateHashtag(String tagName) {
        HashtagEntity hashtag = hashtagRepository.findById(tagName)
                .orElse(HashtagEntity.builder()
                        .tagName(tagName)
                        .build());
        return hashtagRepository.save(hashtag);
    }
}
