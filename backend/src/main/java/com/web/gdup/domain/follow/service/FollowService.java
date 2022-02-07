package com.web.gdup.domain.follow.service;


import com.web.gdup.domain.follow.dto.FollowDto;
import com.web.gdup.domain.user.dto.UserDto;
import jdk.internal.org.objectweb.asm.tree.analysis.Value;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

public interface FollowService {


    List<String> findFollow(String userName); // 현재 로그인 된 유저가 follow할 수 있는 유저 목록 반환
    List<String> findFollowing(String userName); // 현재 로그인 된 유저의 following을 찾아 반환
    List<String> findFollower(String userName); // 현재 로그인 된 유저의 follower을 찾아 반환
}
