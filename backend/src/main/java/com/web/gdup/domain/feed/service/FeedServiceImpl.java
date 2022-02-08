package com.web.gdup.domain.feed.service;

import com.web.gdup.domain.feed.dto.FeedDto;
import com.web.gdup.domain.feed.repository.FeedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service // service 어노테이션을 통해 해당 클래스가 service라는 것을 인식
public class FeedServiceImpl implements FeedService {

    @Autowired
    private FeedRepository feedRepository;

    @Override
    public FeedDto getFeed(int feed_id) {
        FeedDto feed = feedRepository.getOne(feed_id);

        if(feed != null)
            return feed;
        return null;
    }

    @Override
    public List<FeedDto> getAllFeed() {

        List<FeedDto> feeds = feedRepository.findAll();
        if(feeds.size() != 0)
            return feeds;
        return null;
    }

    @Override
    public boolean insertFeed(FeedDto feed) {

        FeedDto feedDto = feedRepository.save(feed);

        if(feedDto != null){
            System.out.println(feedDto);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteFeed(int feedId) {

        Optional<FeedDto> feedDto = feedRepository.findById(feedId);
        if(feedDto.isPresent()){
            feedRepository.deleteById(feedId);
            return true;
        }
        return  false;
    }

    @Override
    public FeedDto modifyFeed(FeedDto feed) {

        Optional<FeedDto> feedDto = feedRepository.findById(feed.getFeedId());
        if(feedDto.isPresent()){
            feedRepository.save(feed);
            return feed;
        }
        return null;
    }
}
