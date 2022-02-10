package com.web.gdup.domain.comment.service;

import com.web.gdup.domain.comment.Entity.CommentEntity;
import com.web.gdup.domain.comment.dto.CommentDto;
import com.web.gdup.domain.comment.dto.ReCommentDto;

public interface CommentService {
    boolean insertComment(CommentDto commentDto);
    boolean insertReComment(ReCommentDto reCommentDto);
    boolean deleteComment(int commentId);
    CommentEntity modifyComment(int commentId, String content);

}
