package com.web.gdup.domain.follow.service;

import com.web.gdup.domain.follow.dto.FollowDto;
import com.web.gdup.domain.follow.dto.FollowID;
import com.web.gdup.domain.follow.repository.FollowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FollowServiceImpl implements FollowService {

    @Autowired
    private FollowRepository followRepository;

    @Override
    public List<String> findFollow(String userName) {
        List<String> userList = followRepository.findFollow(userName);
        return userList;
    }

    @Override
    public List<String> findFollowing(String userName) {
        List<FollowDto> following = followRepository.findByUserName(userName);
        List<String> followingUserName = new ArrayList<>();
        if(following.size() != 0){ // 현재 내가 팔로잉하고 있는 사람이 없다.
            for(FollowDto f : following){
                followingUserName.add(f.getFollowing());
            }
        }
        return followingUserName;
    }

    @Override
    public List<String> findFollower(String userName) {
        List<FollowDto> follower = followRepository.findByFollowing(userName);
        List<String> followerUserName = new ArrayList<>();
        if(follower.size() != 0){ // 현재 내가 팔로잉하고 있는 사람이 없다.
            for(FollowDto f : follower){
                followerUserName.add(f.getUserName());
            }
        }
        return followerUserName;
    }

    @Override
    public boolean follow(String userName, String following) {


        Optional<FollowDto> follow  = followRepository.findFollowDtoByUserNameAndFollowing(userName, following);

        if(!follow.isPresent()){ // 팔로우 관계가 아니라면
            FollowDto newFollow = followRepository.save(new FollowDto(userName, following));
            System.out.println(newFollow);
            return true;
        }
        return false;
    }
}
