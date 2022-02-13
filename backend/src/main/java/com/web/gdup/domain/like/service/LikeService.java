package com.web.gdup.domain.like.service;

import com.web.gdup.domain.feed.dto.FeedDto;
import com.web.gdup.domain.user.dto.UserDto;

import java.util.List;

public interface LikeService {
    boolean pushLike(int feedId, String userName);
    int getLikeCnt(int feedId);
    List<String> getUsers(int feedId);
    List<String> getWhetherToPush(List<FeedDto> feedDtoList, String userName);
    //feedlist들 중 로그인한 사용자가 해당 피드의 좋아요를 눌렀는지 여부를 반환
}
