package com.web.gdup.domain.comment.controller;

import com.web.gdup.domain.comment.dto.CommentDto;
import com.web.gdup.domain.comment.service.CommentService;
import com.web.gdup.domain.model.BasicResponse;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comment")
public class CommentController {

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
}
