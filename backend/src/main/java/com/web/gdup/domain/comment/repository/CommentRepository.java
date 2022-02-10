package com.web.gdup.domain.comment.repository;

import com.web.gdup.domain.comment.Entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {

    @Query(value = "select max(groupOrder) + 1 from comment where originId =:origin_id",
    nativeQuery = true)
    int findGroupOrder(@Param("origin_id") int originId);
    List<CommentEntity> findByFeedId(int feedId);
}
