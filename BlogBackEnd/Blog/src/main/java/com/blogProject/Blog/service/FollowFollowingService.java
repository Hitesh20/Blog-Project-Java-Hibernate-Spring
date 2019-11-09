package com.blogProject.Blog.service;


import com.blogProject.Blog.dao.Followers;
import com.blogProject.Blog.dao.Following;
import com.blogProject.Blog.dao.User;
import com.blogProject.Blog.repository.FollowersRepository;
import com.blogProject.Blog.repository.FollowingRepository;
import com.blogProject.Blog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FollowFollowingService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    FollowersRepository followersRepository;

    @Autowired
    FollowingRepository followingRepository;

    public boolean checkFollowing(Long currentUser, Long userId) {
        User loggedInUser = userRepository.findByUserId(currentUser);
        User viewingUser = userRepository.findByUserId(userId);
        // System.out.println(followingRepository.findAllByCurrentUserAndFollowing(loggedInUser, viewingUser));
        if(followingRepository.findAllByCurrentUserAndFollowing(loggedInUser, viewingUser)!=null) {
            return true;
        } else {
            return false;
        }
    }

    public void followThisUser(Long currentUser, Long userId) {
        User loggedInUser = userRepository.findByUserId(currentUser);
        User viewingUser = userRepository.findByUserId(userId);

        if(followingRepository.findAllByCurrentUserAndFollowing(loggedInUser, viewingUser) == null) {
            Following following = new Following(loggedInUser, viewingUser);
            followingRepository.save(following);
        }

        if(followersRepository.findAllByCurrentUserAndFollower(viewingUser, loggedInUser) == null) {
            Followers followers = new Followers(viewingUser, loggedInUser);
            followersRepository.save(followers);
        }

    }

    public void unfollowThisUser(Long currentUser, Long userId) {
        User loggedInUser = userRepository.findByUserId(currentUser);
        User viewingUser = userRepository.findByUserId(userId);

        if(followingRepository.findAllByCurrentUserAndFollowing(loggedInUser, viewingUser) != null) {
            Following following = (Following) followingRepository.findAllByCurrentUserAndFollowing(loggedInUser, viewingUser);
            followingRepository.delete(following);
            System.out.println("following");
        }

        if(followersRepository.findAllByCurrentUserAndFollower(viewingUser, loggedInUser) != null) {
            System.out.println("follower");
            Followers followers = (Followers) followersRepository.findAllByCurrentUserAndFollower(viewingUser, loggedInUser);
            followersRepository.delete(followers);
        }
    }

    public List<Followers> getFollowersOfThisAccount(Long userId) {
        User currentUser = userRepository.findByUserId(userId);
        System.out.println(followersRepository.findAllByCurrentUser(currentUser));
        return followersRepository.findAllByCurrentUser(currentUser);
    }

    public List<Following> getFollowingOfThisAccount(Long userId) {
        User currentUser = userRepository.findByUserId(userId);
        return followingRepository.findAllByCurrentUser(currentUser);
    }
}
