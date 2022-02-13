package com.web.gdup.domain.feed.controller;

import com.web.gdup.domain.comment.Entity.CommentEntity;
import com.web.gdup.domain.comment.service.CommentService;
import com.web.gdup.domain.feed.dto.FeedDto;
import com.web.gdup.domain.feed.dto.RecommandDto;
import com.web.gdup.domain.feed.service.FeedService;
import com.web.gdup.domain.like.service.LikeService;
import com.web.gdup.domain.model.BasicResponse;
import com.web.gdup.domain.wordcloud.service.wordService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/feed")
public class FeedController {

    @Autowired
    private wordService ws;

    @Autowired
    private FeedService feedService;

    @Autowired
    private LikeService likeService;

    @Autowired
    private CommentService commentService;

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
    public Object deleteFeed(@RequestParam int feedId  ){
        //관련 댓글도 다 사라져야함
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
            notes = "로그인된 사용자의 팔로잉의 feed를 반환한다."
    )
    public Object getFeeds(@RequestParam String userName){
        List<FeedDto> feeds = feedService.getAllFeed(userName);
        List<String> whetherToPush = likeService.getWhetherToPush(feeds, userName);
        ResponseEntity response = null;

        if(feeds != null){
            for(FeedDto feed : feeds){
                System.out.println(feed);
            }
            HashMap<String,Object> map = new HashMap<>();
            map.put("feeds", feeds);
            map.put("whetherToPush", whetherToPush);

            final BasicResponse result = new BasicResponse();
            result.status = true;
            result.message = "success";
            result.data = map;
            response = new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return response;
    }

    @GetMapping ("/detail")
    @ApiOperation(value = "선택된 피드 불러오기")
    public Object getFeed(@RequestParam int feedId){

        ResponseEntity response = null;

        Optional<FeedDto> feed = feedService.getFeed(feedId);
        int likeCnt = likeService.getLikeCnt(feedId);
        List<String> users = likeService.getUsers(feedId);
        List<CommentEntity> comments = commentService.getComments(feedId);

        HashMap<String,Object> map = new HashMap<>();
        map.put("feed", feed);
        map.put("likeCnt", likeCnt);
        map.put("users", users);
        map.put("comments", comments);

        if(feed.isPresent()){
            final BasicResponse result = new BasicResponse();
            result.status = true;
            result.message = "success";
            result.data = map;
            response = new ResponseEntity<>(result, HttpStatus.OK);
        }  else {
            response = new ResponseEntity<>(null, HttpStatus.OK);
        }
        return response;
    }

    @GetMapping ("/like/push")
    @ApiOperation(value = "피드 좋아요 누르기",
            notes = "좋아요 누를 피드 번호와 현재 로그인 된 유저 이름을 파라미터로 받는다. ")
    public Object pushLike(@RequestParam int feedId, @RequestParam String userName){
        ResponseEntity response = null;

        final BasicResponse result = new BasicResponse();
        result.status = true;
        result.message = "success";

        if(likeService.pushLike(feedId, userName)){
            result.data = "push";
            response = new ResponseEntity<>(result, HttpStatus.OK);
        }  else {
            result.data = "unpush";
            response = new ResponseEntity<>(result, HttpStatus.OK);
        }
        return response;
    }

    @GetMapping("/tag/list")
    @ApiOperation(
            value = "tag word 리스트 가져오기",
            notes = "최신 태그 리스트를 가져온다."
    )
    public ResponseEntity<List<Object[]>> getTagList() {
        return new ResponseEntity<>(ws.getList(), HttpStatus.OK);
    }

    @GetMapping("/tag/search/{tagName}")
    @ApiOperation(
            value = "tag word 리스트 가져오기",
            notes = "최신 태그 리스트를 가져온다."
    )
    public ResponseEntity<List<RecommandDto>> getTagCodyList(@PathVariable String tagName) {

        return new ResponseEntity<>((List<RecommandDto>) feedService.recommendService(tagName), HttpStatus.OK);
    }

}
