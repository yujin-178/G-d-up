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
    @ApiOperation(value = "Feed 작성하기 ", notes = "새로운 피드 글을 작성한다. ")
    public Object writeFeed(@RequestBody FeedDto feed) {

        final BasicResponse result = new BasicResponse();
        boolean ans = false;

        try {
            ans = feedService.insertFeed(feed);
        } catch (Exception e) {
            result.status = false;
            result.message = "피드 생성 실패";
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        }

        result.status = ans;
        result.message = "success";

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PutMapping("/modify")
    @ApiOperation(value = "Feed 수정하기 ", notes = "작성된 피드 글을 수정한다. ")
    public Object modifyFeed(@RequestBody FeedDto feed) {

        FeedDto feedDto = null;
        ResponseEntity response = null;
        final BasicResponse result = new BasicResponse();
        try {
            feedDto = feedService.modifyFeed(feed);
        } catch (Exception e) {
            result.status = false;
            result.message = "존재 하지 않는 피드 수정 시도";
            result.data = null;
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        }

        result.status = true;
        result.message = "피드 수정 성공";
        result.data = feedDto;

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{feedId}")
    @ApiOperation(value = "Feed 지우기 ", notes = "작성한 피드를 지운다. ")
    public Object deleteFeed(@PathVariable int feedId) {

        final BasicResponse result = new BasicResponse();
        boolean deleteFeed = false;

        try {
            deleteFeed = feedService.deleteFeed(feedId);
        } catch (Exception e) {
            result.status = false;
            result.message = "DB에 없는 feedid를 삭제 시도 했습니다. .";
            result.data = null;
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        }

        result.status = deleteFeed;
        result.message = "success";
        result.data = null;
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/all/{userName}")
    @ApiOperation(value = "모든 피드 불러오기",
            notes = "로그인된 사용자의 팔로잉의 feed를 반환한다."
    )
    public Object getFeeds(@PathVariable String userName) {
        List<FeedDto> feeds = null;

        final BasicResponse result = new BasicResponse();

        try {
            feeds = feedService.getAllFeed(userName);
        } catch (Exception e) {
            result.status = true;
            result.message = "작성된 피드가 없습니다.";
            result.data = null;
            return new ResponseEntity<>(result, HttpStatus.OK);
        }

        List<String> whetherToPush = likeService.getWhetherToPush(feeds, userName);

        HashMap<String, Object> map = new HashMap<>();
        map.put("feeds", feeds);
        map.put("whetherToPush", whetherToPush);

        result.status = true;
        result.message = "success";
        result.data = map;

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/detail/{feedId}")
    @ApiOperation(value = "선택된 피드 불러오기")
    public Object getFeed(@PathVariable int feedId) {

        final BasicResponse result = new BasicResponse();
        FeedDto feed = null;
        try {
            feed = feedService.getFeed(feedId);
        } catch (Exception e) {
            result.status = true;
            result.message = "DB에 없는 feedid를 조회했습니다.";
            result.data = null;
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        }

        int likeCnt = likeService.getLikeCnt(feedId);
        List<String> users = likeService.getUsers(feedId);
        List<CommentEntity> comments = commentService.getComments(feedId);

        HashMap<String, Object> map = new HashMap<>();
        map.put("feed", feed);
        map.put("likeCnt", likeCnt);
        map.put("users", users);
        map.put("comments", comments);

        result.status = true;
        result.message = "success";
        result.data = map;
        return new ResponseEntity<>(result, HttpStatus.OK);

    }

    @GetMapping("/like/push/{feedId}/{userName}")
    @ApiOperation(value = "피드 좋아요 누르기",
            notes = "좋아요 누를 피드 번호와 현재 로그인 된 유저 이름을 파라미터로 받는다. ")
    public Object pushLike(@PathVariable int feedId, @PathVariable String userName) {
        final BasicResponse result = new BasicResponse();

        try {
            FeedDto feed = feedService.getFeed(feedId);
        } catch (Exception e) {
            result.status = true;
            result.message = "DB에 없는 feedid에 접근했습니다.";
            result.data = null;
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        }

        result.status = true;
        result.message = "success";

        if (likeService.pushLike(feedId, userName)) {
            result.data = "push";
        } else {
            result.data = "unpush";
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
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
