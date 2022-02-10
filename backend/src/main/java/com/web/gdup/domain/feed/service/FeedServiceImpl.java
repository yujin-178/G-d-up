package com.web.gdup.domain.feed.service;

import com.web.gdup.domain.cody.entity.CodyEntity;
import com.web.gdup.domain.cody.entity.CodyHashtagEntity;
import com.web.gdup.domain.cody.repository.CodyHashtagRepository;
import com.web.gdup.domain.cody.repository.CodyRepository;
import com.web.gdup.domain.feed.dto.FeedDto;
import com.web.gdup.domain.feed.dto.RecommandDto;
import com.web.gdup.domain.feed.repository.FeedRepository;
import com.web.gdup.domain.like.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service // service 어노테이션을 통해 해당 클래스가 service라는 것을 인식
public class FeedServiceImpl implements FeedService {

    @Autowired
    private FeedRepository feedRepository;

    @Autowired
    private CodyHashtagRepository codyHashtagRepository;

    @Autowired
    private CodyRepository codyRepository;

    @Autowired
    private LikeRepository likeRepository;

    @Override
    public Optional<FeedDto> getFeed(int feedId) {
        Optional<FeedDto> feedDto = feedRepository.findById(feedId);
        if (feedDto.isPresent())
            return feedDto;
        return null;
    }

    @Override
    public FeedDto modifyFeed(FeedDto feed) {

        Optional<FeedDto> feedDto = feedRepository.findById(feed.getFeedId());
        if (feedDto.isPresent()) {
            feedRepository.save(feed);
            return feed;
        }
        return null;
    }

    @Override
    public List<FeedDto> getAllFeed(String userName) {

        List<FeedDto> feeds = feedRepository.findFollowingFeeds(userName);
        if (feeds.size() != 0)
            return feeds;
        return null;
    }

    @Override
    public boolean insertFeed(FeedDto feed) {

        FeedDto feedDto = feedRepository.save(feed);

        if (feedDto != null) {
            System.out.println(feedDto);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteFeed(int feedId) {

        Optional<FeedDto> feedDto = feedRepository.findById(feedId);
        if (feedDto.isPresent()) {
            feedRepository.deleteById(feedId);
            return true;
        }
        return false;
    }

    @Override
    public List<RecommandDto> recommendService(String tagName) {
        List<RecommandDto> listRecommand = new ArrayList<RecommandDto>();
        List<CodyHashtagEntity> che = codyHashtagRepository.findAllByTagName(tagName);

        System.out.println(che.size());
        System.out.println("이건 동작하나??");

        for (CodyHashtagEntity a : che) {
            System.out.println("태그 있는 코디 리스트 : " + a.toString());
            CodyEntity tmp = codyRepository.getOne(a.getCodyId());
            if (tmp.getSecret() == 0) {
                List<FeedDto> feedList = feedRepository.findAllByCodyId(a.getCodyId());
                int maxLike = 0;
                int feedId = -1;
                for (FeedDto b : feedList) {
                    System.out.println("코디를 이용한 피드 리스트 : " + b.toString());
                    int cnt = likeRepository.getLikeCnt(b.getFeedId());
                    if (maxLike < cnt) {
                        maxLike = cnt;
                        feedId = b.getFeedId();
                    }
                }


                listRecommand.add(new RecommandDto(tmp, maxLike));
            }
        }

        Collections.sort(listRecommand, new Comparator<RecommandDto>() {
            @Override
            public int compare(RecommandDto o1, RecommandDto o2) {
                return -Integer.compare(o1.getLike(), o2.getLike());
            }
        });

        for (RecommandDto a : listRecommand) {
            System.out.println("코디 순서 : " + a.toString());
        }


        return listRecommand;
    }
}
