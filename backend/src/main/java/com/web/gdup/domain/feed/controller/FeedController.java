package com.web.gdup.domain.feed.controller;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.web.gdup.domain.feed.dto.FeedDto;
import com.web.gdup.domain.feed.service.FeedService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = { "http://i6b108.p.ssafy.io:3000" })
@RestController("/feed")
public class FeedController {

    @Autowired
    private FeedService feedService;

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


}
