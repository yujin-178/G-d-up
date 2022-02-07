package com.web.gdup.domain.clothing_hashtag.service;

import com.web.gdup.domain.clothing_hashtag.dto.ClothingHashtagDto;
import com.web.gdup.domain.clothing_hashtag.repository.ClothingHashtagRepository;
import com.web.gdup.domain.hashtag.service.HashtagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;

@Service
public class ClothingHashtagService implements ClothingHashtagServiceImpl{
    @Autowired
    private ClothingHashtagRepository clothingHashtagRepository;
    @Autowired
    private HashtagService hashtagService;

    @Override
    @Transactional
    public void insertHashtags(int clothing_id, Set<String> hashtags) {
        ClothingHashtagDto clothingHashtagDto = mapToClothingHashtags(clothing_id, hashtags);

    }

    private ClothingHashtagDto mapToClothingHashtags(int clothing_id, Set<String> hashtags) {
//        Set<ClothingHashtagDto> ht = hashtags.stream()
//                .map(tagName -> {
//                    HashtagDto hashtag = hashtagService.findOrCreateHashtag(tagName);
//                    return
//                })
//                .collect(Collectors.toSet());
        return null;
    }

    public ClothingHashtagDto findOrCreateClothingHashtag(int clothing_id, String tagName) {
//        HashtagDto hashtag = clothingHashtagRepository.findById(tagName)
//                .orElse(HashtagDto.builder()
//                        .tagName(tagName)
//                        .build());
//        return hashtag;
        return null;
    }
}
