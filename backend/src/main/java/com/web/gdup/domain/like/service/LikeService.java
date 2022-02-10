package com.web.gdup.domain.like.service;

import com.web.gdup.domain.user.dto.UserDto;

import java.util.List;

public interface LikeService {
    boolean pushLike(int feedId, String userName);
    int getLikeCnt(int feedId);
    List<String> getUsers(int feedId);
}
