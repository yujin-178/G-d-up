package com.web.gdup.domain.comment.service;

import com.web.gdup.domain.comment.dto.CommentDto;
import com.web.gdup.domain.comment.repository.CommentRepository;
import com.web.gdup.domain.feed.dto.FeedDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Override
    public boolean insertComment(CommentDto commentDto) {

        CommentDto comment = commentRepository.save(commentDto);
        if(comment != null){
            System.out.println(comment);
            return true;
        }
        return false;
    }
}
