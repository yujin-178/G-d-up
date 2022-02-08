package com.web.gdup.domain.feed.controller;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.web.gdup.domain.feed.dto.FeedDto;
import com.web.gdup.domain.feed.service.FeedService;
import com.web.gdup.domain.model.BasicResponse;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = { "http://i6b108.p.ssafy.io:3000" })
@RestController("/feed")
public class FeedController {

    @Autowired
    private FeedService feedService;

    @PostMapping("/write")
    @ApiOperation(value = "Feed 작성하기 " , notes = "새로운 피드 글을 작성한다. ")
    public Object writeFeed(@RequestBody FeedDto feed){
        ResponseEntity response = null;

        if(feedService.insertFeed(feed)){
            final BasicResponse result = new BasicResponse();
            result.status = true;
            result.message = "success";
            response = new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @PutMapping("/modify")
    @ApiOperation(value = "Feed 수정하기 " , notes = "작성된 피드 글을 수정한다. ")
    public Object modifyFeed(@RequestBody FeedDto feed){

        FeedDto feedDto = feedService.modifyFeed(feed);
        ResponseEntity response = null;

        if(feedDto != null){
            final BasicResponse result = new BasicResponse();
            result.status = true;
            result.message = "success";
            result.data = feedDto;
            response = new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @DeleteMapping("/delete")
    @ApiOperation(value = "Feed 지우기 " , notes = "작성한 피드를 지운다. ")
    public Object DeleteFeed(@RequestParam int feedId  ){
        ResponseEntity response = null;

        if(feedService.deleteFeed(feedId)){
            final BasicResponse result = new BasicResponse();
            result.status = true;
            result.message = "success";
            response = new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @GetMapping("/all")
    @ApiOperation(value = "모든 피드 불러오기",
            notes = "로그인된 사용자가 팔로우하는 사람들의 feed를 반환한다."
    )
    public void getAllFeed(){
        List<FeedDto> feeds = feedService.getAllFeed();

        for(FeedDto feed : feeds){
            System.out.println(feed);
        }
    }

    @GetMapping("/")
    @ApiOperation(value = "선택된 피드 불러오기")
    public void getFeed(@RequestParam int feed_id){

        FeedDto feed = feedService.getFeed(feed_id);

        System.out.println(feed);
    }




    public void pushLike(){

    }

    public void writeComment(){

    }

    public void modifyComment(){

    }

    public void deleteComment(){

    }
}
