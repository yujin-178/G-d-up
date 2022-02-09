package com.web.gdup.domain.comment.service;

import com.web.gdup.domain.comment.dto.CommentDto;

public interface CommentService {
    boolean insertComment(CommentDto commentDto);
}
