package com.web.gdup.domain.follow.repository;

import com.web.gdup.domain.follow.dto.FollowDto;
import com.web.gdup.domain.follow.dto.FollowID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FollowRepository extends JpaRepository<FollowDto, FollowID> {

//    //현재 팔로우 할 수 있는 친구 목록 노출
//    @Query("select following from FollowDto where userName = :loginName " )
////            "(select following from follow where userName = :loginName)")
//    List<FollowDto> findUserList(@Param("loginName") String userName);
    @Query(value = "select following from follow where following not in" +
        "(select following from follow where userName = :loginName) and following != :loginName ", nativeQuery = true)
    List<String> findFollow(@Param("loginName") String userName); // 현재 로그인 된 유저가 follow할 수 있는 유저 목록 반환
    List<FollowDto> findByUserName(String userName);
    List<FollowDto> findByFollowing(String following);
}
