package com.web.gdup.domain.comment.repository;

import com.web.gdup.domain.comment.dto.CommentDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<CommentDto, Integer> {
}
