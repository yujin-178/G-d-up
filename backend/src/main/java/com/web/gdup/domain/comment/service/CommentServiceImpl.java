package com.web.gdup.domain.comment.service;

import com.web.gdup.domain.comment.Entity.CommentEntity;
import com.web.gdup.domain.comment.dto.CommentDto;
import com.web.gdup.domain.comment.dto.ReCommentDto;
import com.web.gdup.domain.comment.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Override
    public Optional<CommentEntity> insertComment(CommentDto commentDto) throws Exception {

        CommentEntity comment = commentDto.toEntity();
        CommentEntity c = commentRepository.save(comment);
        c.setOriginId(c.getCommentId());
        Optional<CommentEntity> commentEntity = Optional.of(commentRepository.save(c));
        commentEntity.orElseThrow(() -> new Exception("null"));
        return commentEntity;
    }

    @Override
    public boolean insertReComment(ReCommentDto reCommentDto) {

        CommentEntity comment = reCommentDto.toEntity();

        if(comment != null){
            int groupOrder = commentRepository.findGroupOrder(comment.getOriginId());
            comment.setGroupOrder(groupOrder);
            commentRepository.save(comment);
            return true;
        }
        return false;
    }


    @Override
    public boolean deleteComment(int commentId) {
        Optional<CommentEntity> comment = commentRepository.findById(commentId);
        if(comment.isPresent()){
            commentRepository.deleteById(commentId);
            return true;
        }
        return false;
    }

    @Override
    public List<CommentEntity> getComments(int feedId) {
        return commentRepository.findByFeedId(feedId);
    }

    @Override
    public CommentEntity modifyComment(int commentId, String content) {

        Optional<CommentEntity> comment = commentRepository.findById(commentId);

        if(comment.isPresent()){
            comment.get().setContent(content);
            commentRepository.save(comment.get());
            return  comment.get();
        }
        return null;
    }


}
