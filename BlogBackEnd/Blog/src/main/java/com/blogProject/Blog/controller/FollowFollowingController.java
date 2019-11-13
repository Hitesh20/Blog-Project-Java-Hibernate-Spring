package com.blogProject.Blog.controller;


import com.blogProject.Blog.dao.Blog;
import com.blogProject.Blog.dao.Followers;
import com.blogProject.Blog.dao.Following;
import com.blogProject.Blog.service.FollowFollowingService;
import com.blogProject.Blog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class FollowFollowingController {

    @Autowired
    FollowFollowingService ffService;

    @Autowired
    UserService userService;

    @GetMapping("/checkIsFollowing/{userId}")
    public String isFollowing(@PathVariable Long userId, Principal principal)
    {
        if(ffService.checkFollowing(userService.getUserId(principal), userId)){
            return "\"true\"";
        } else {
            return "\"false\"";
        }
    }

    @GetMapping("/followUser/{userId}")
    public String followUser(@PathVariable Long userId, Principal principal)
    {
        ffService.followThisUser(userService.getUserId(principal), userId);
        return "\"Followed\"";
    }

    @GetMapping("/unfollowUser/{userId}")
    public String unfollowUser(@PathVariable Long userId, Principal principal)
    {
        ffService.unfollowThisUser(userService.getUserId(principal), userId);
        return "\"unFollowed\"";
    }

    @GetMapping("/getFollowers")
    public List<Followers> getFollowers(Principal principal)
    {
        return ffService.getFollowersOfThisAccount(userService.getUserId(principal));
    }

    @GetMapping("/getFollowings")
    public List<Following> getFollowings(Principal principal)
    {
        return ffService.getFollowingOfThisAccount(userService.getUserId(principal));
    }

}
