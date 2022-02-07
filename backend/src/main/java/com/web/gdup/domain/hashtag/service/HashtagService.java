package com.web.gdup.domain.hashtag.service;

import com.web.gdup.domain.hashtag.dto.HashtagDto;
import com.web.gdup.domain.hashtag.repository.HashtagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HashtagService implements HashtagServiceImpl{
    @Autowired
    private HashtagRepository hashtagRepository;

    @Override
    public String insertHashtag(HashtagDto tag) {
        return hashtagRepository.save(tag).getTagName();
    }

    @Override
    public HashtagDto getHashtag(String tag) {
        return hashtagRepository.getOne(tag);
    }

    public HashtagDto findOrCreateHashtag(String tagName) {
        HashtagDto hashtag = hashtagRepository.findById(tagName)
                .orElse(HashtagDto.builder()
                        .tagName(tagName)
                        .build());
        return hashtag;
    }
}
