package com.web.gdup.domain.clothing_hashtag.service;

import com.web.gdup.domain.clothing_hashtag.dto.ClothingHashtagDto;
import com.web.gdup.domain.clothing_hashtag.entity.ClothingHashtagEntity;
import com.web.gdup.domain.clothing_hashtag.repository.ClothingHashtagRepository;
import com.web.gdup.domain.hashtag.entity.HashtagEntity;
import com.web.gdup.domain.hashtag.service.HashtagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ClothingHashtagService implements ClothingHashtagServiceImpl{
    @Autowired
    private ClothingHashtagRepository clothingHashtagRepository;
    @Autowired
    private HashtagService hashtagService;

    @Override
    @Transactional
    public void insertHashtags(int clothing_id, Set<String> hashtags) {
        Set<ClothingHashtagDto> set = mapToClothingHashtags(clothing_id, hashtags);
        for(ClothingHashtagDto cd : set) {
            System.out.println(cd.getClothingId());
            System.out.println(cd.getTagName());
        }
    }

    @Override
    public List<ClothingHashtagDto> getHashtags(int clothing_id) {
        List<ClothingHashtagDto> result = new ArrayList<>();
        List<ClothingHashtagEntity> hashtags = clothingHashtagRepository.findByClothingId(clothing_id);
        for(ClothingHashtagEntity hashtag : hashtags) {
            result.add(buildClothingHashtagDto(hashtag));
        }
        return result;
    }

    private Set<ClothingHashtagDto> mapToClothingHashtags(int clothing_id, Set<String> hashtags) {
        Set<ClothingHashtagDto> ht = hashtags.stream()
                .map(tagName -> {
                    HashtagEntity hashtag = hashtagService.findOrCreateHashtag(tagName);
                    return findOrCreateClothingHashtag(clothing_id, hashtag.getTagName());
                })
                .collect(Collectors.toSet());
        return ht;
    }

    public ClothingHashtagDto findOrCreateClothingHashtag(int clothing_id, String tagName) {
        ClothingHashtagEntity hashtag = clothingHashtagRepository.findByClothingIdAndTagName(clothing_id, tagName)
                .orElse(ClothingHashtagEntity.builder()
                        .clothingId(clothing_id)
                        .tagName(tagName)
                        .registrationDate(LocalDateTime.now())
                        .build());
        ClothingHashtagEntity clothingHashtag = clothingHashtagRepository.save(hashtag);
        return buildClothingHashtagDto(clothingHashtag);
    }

    private ClothingHashtagDto buildClothingHashtagDto(ClothingHashtagEntity clothingHashtag) {
        ClothingHashtagDto clothingHashtagDto = ClothingHashtagDto.builder()
                .clothingId(clothingHashtag.getClothingId())
                .tagName(clothingHashtag.getTagName())
                .registrationDate(clothingHashtag.getRegistrationDate())
                .build();
        return clothingHashtagDto;
    }
}
