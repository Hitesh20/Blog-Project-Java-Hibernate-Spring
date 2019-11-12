package com.blogProject.Blog.dao;
import javax.persistence.*;

@Entity
public class Followers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followerId;
    @ManyToOne
    private User currentUser;
    @ManyToOne
    private User follower;

    public Followers() {}

    public Followers(User currentUser, User follower) {
        this.currentUser = currentUser;
        this.follower = follower;
    }

    public Long getFollowerId() {
        return followerId;
    }

    public void setFollowerId(Long followerId) {
        this.followerId = followerId;
    }

    public User getCurrentUser() {
        return currentUser;
    }

    public void setCurrentUser(User currentUser) {
        this.currentUser = currentUser;
    }

    public User getFollower() {
        return follower;
    }

    public void setFollower(User follower) {
        this.follower = follower;
    }
}
