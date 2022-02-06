package com.web.gdup.domain.feed.controller;

import com.web.gdup.domain.feed.dto.FeedDto;
import com.web.gdup.domain.feed.service.FeedService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = { "http://i6b108.p.ssafy.io:3000" })
@RestController("/feed")
public class FeedController {

    @Autowired
    private FeedService feedService;

//    @GetMapping("/")
//    @ApiOperation(value = "모든 피드 불러오기")
//    public

    @GetMapping("/")
    public void getFeed(@RequestParam int feed_id){

        FeedDto feed = feedService.getFeed(feed_id);

        System.out.println(feed);
    }
}
