package com.web.gdup.domain.follow.service;

import com.web.gdup.domain.follow.dto.FollowDto;

import java.util.List;
import java.util.Optional;

public interface FollowService {


    List<String> findFollow(String userName); // 현재 로그인 된 유저가 follow할 수 있는 유저 목록 반환
    List<String> findFollowing(String userName); // 현재 로그인 된 유저의 following을 찾아 반환
    List<String> findFollower(String userName); // 현재 로그인 된 유저의 follower을 찾아 반환
    boolean follow(String userName, String following); // 현재 로그인 된 유저가 타 사용자를 follow
}
