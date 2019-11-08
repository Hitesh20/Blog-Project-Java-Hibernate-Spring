package com.blogProject.Blog.repository;


import com.blogProject.Blog.dao.Followers;
import com.blogProject.Blog.dao.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowersRepository extends JpaRepository<Followers, Long> {

    Object findAllByCurrentUserAndFollower(User currentUser, User follower);

    List<Followers> findAllByCurrentUser(User currentUser);
}
