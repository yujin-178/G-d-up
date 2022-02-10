package com.web.gdup.domain.like.service;

import com.web.gdup.domain.like.dto.LikeDto;
import com.web.gdup.domain.like.entity.LikeEntity;
import com.web.gdup.domain.like.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LikeServiceImpl implements LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Override
    public boolean pushLike(int feedId, String userName) {

        LikeEntity likeEntity = new LikeDto(feedId, userName).toEntity();
        System.out.println(likeEntity + "????");

        Optional<LikeEntity> likeEntityTmp = likeRepository.findByFeedIdAndUserName(likeEntity.getFeedId(), likeEntity.getUserName());

        System.out.println(likeEntityTmp + "?????");
        if(likeEntityTmp.isPresent()){
            //있다면 기존 사용자가 좋아요를 이미 누른 상태이므로, 취소해야합니다.
            likeRepository.delete(likeEntityTmp.get());
            return false;
        }
        //없다면 이제 피드 좋아요를 누를겁니다.
        likeRepository.save(likeEntity);
        return  true;

    }

    @Override
    public int getLikeCnt(int feedId) {
        return likeRepository.getLikeCnt(feedId);
    }

    @Override
    public List<String> getUsers(int feedId) {
        return likeRepository.findUsers(feedId);
    }
}
