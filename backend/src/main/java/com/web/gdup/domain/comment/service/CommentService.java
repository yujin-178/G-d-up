package com.web.gdup.domain.comment.service;

import com.web.gdup.domain.comment.Entity.CommentEntity;
import com.web.gdup.domain.comment.dto.CommentDto;
import com.web.gdup.domain.comment.dto.ReCommentDto;

import java.util.List;
import java.util.Optional;

public interface CommentService {
    Optional<CommentEntity> insertComment(CommentDto commentDto) throws Exception;
    boolean insertReComment(ReCommentDto reCommentDto);
    boolean deleteComment(int commentId);
    CommentEntity modifyComment(int commentId, String content);
    List<CommentEntity> getComments(int feedId);

}
