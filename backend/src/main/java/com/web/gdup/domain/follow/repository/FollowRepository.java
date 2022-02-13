package com.web.gdup.domain.follow.repository;

import com.web.gdup.domain.follow.dto.FollowDto;
import com.web.gdup.domain.follow.dto.FollowId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<FollowDto, FollowId> {

    @Query(value = "select userName from user where userName not in" +
        "(select following from follow where userName = :loginName) and userName != :loginName ", nativeQuery = true)
    List<String> findFollow(@Param("loginName") String userName); // 현재 로그인 된 유저가 follow할 수 있는 유저 목록 반환
    List<FollowDto> findByUserName(String userName);
    List<FollowDto> findByFollowing(String following);
    Optional<FollowDto> findFollowDtoByUserNameAndFollowing(String userName, String following);

}
