package com.web.gdup.domain.feed.repository;

import com.web.gdup.domain.feed.dto.FeedDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface FeedRepository extends JpaRepository<FeedDto, Integer> {
    List<FeedDto> findByUserName(String userName);

    @Query(value = "select * from feed where userName in " +
            "(select following from follow where userName = :loginName ) or userName = :loginName"
            , nativeQuery = true)
    List<FeedDto> findFollowingFeeds(@Param("loginName") String userName);

    @Query(value = "select * from feed where codyid = :codyId", nativeQuery = true)
    List<FeedDto> findAllByCodyId(int codyId);

}
