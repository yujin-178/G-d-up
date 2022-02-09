package com.web.gdup.domain.comment.service;

import com.web.gdup.domain.comment.Entity.CommentEntity;
import com.web.gdup.domain.comment.dto.CommentDto;
import com.web.gdup.domain.comment.dto.ReCommentDto;
import com.web.gdup.domain.feed.service.FeedService;

public interface CommentService {
    boolean insertComment(CommentDto commentDto);
    boolean insertReComment(ReCommentDto reCommentDto);
    boolean deleteComment(int commentId);
    CommentEntity modifyComment(CommentEntity commentEntity);

}
