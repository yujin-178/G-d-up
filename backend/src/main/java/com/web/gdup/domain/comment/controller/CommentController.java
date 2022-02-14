package com.web.gdup.domain.comment.controller;

import com.web.gdup.domain.comment.Entity.CommentEntity;
import com.web.gdup.domain.comment.dto.CommentDto;
import com.web.gdup.domain.comment.dto.ReCommentDto;
import com.web.gdup.domain.comment.service.CommentService;
import com.web.gdup.domain.model.BasicResponse;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comment")
@CrossOrigin
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/write")
    @ApiOperation(value = "Comment 작성하기" , notes = "새로운 댓글을 작성한다. ")
    public Object writeComment(@RequestBody CommentDto commentDto){
        ResponseEntity response = null;

        if(commentService.insertComment(commentDto)){
            final BasicResponse result = new BasicResponse();
            result.status = true;
            result.message = "SUCCESS";
            response = new ResponseEntity<>(result, HttpStatus.OK);
        }     else {
            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @PostMapping("/write/recomment")
    @ApiOperation(value = "reComment 작성하기" , notes = "새로운 답글을 작성한다. ")
    public Object writeReComment(@RequestBody ReCommentDto reCommentDto){
        ResponseEntity response = null;

        if(commentService.insertReComment(reCommentDto)){
            final BasicResponse result = new BasicResponse();
            result.status = true;
            result.message = "SUCCESS";
            response = new ResponseEntity<>(result, HttpStatus.OK);
        }     else {
            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @DeleteMapping("/delete/{commentId}")
    @ApiOperation(value = "comment 지우기 " , notes = "작성한 댓글을 지운다. ")
    public Object deleteComment(@PathVariable int commentId){
        ResponseEntity response = null;
        final BasicResponse result = new BasicResponse();

        if(commentService.deleteComment(commentId)){

            result.status = true;
            result.message = "success";
            result.data = null;
            response = new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            result.status = true;
            result.message = "DB에 없는 commentid를 삭제 시도 했습니다.";
            result.data = null;
            response = new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @PutMapping("/modify")
    @ApiOperation(value = "comment 수정하기 " , notes = "작성된  댓글을 수정한다. ")
    public Object modifyComment(@RequestParam int commentId,@RequestParam String content){
        CommentEntity comment = commentService.modifyComment(commentId, content);
        ResponseEntity response = null;

        if(comment != null){
            final BasicResponse result = new BasicResponse();
            result.status = true;
            result.message = "success";
            result.data = comment;
            response = new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return response;
    }

}
