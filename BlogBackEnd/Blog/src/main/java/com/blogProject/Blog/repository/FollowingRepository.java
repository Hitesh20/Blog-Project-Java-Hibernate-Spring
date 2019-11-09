package com.blogProject.Blog.repository;


import com.blogProject.Blog.dao.Followers;
import com.blogProject.Blog.dao.Following;
import com.blogProject.Blog.dao.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface FollowingRepository extends JpaRepository<Following, Long> {

    Object findAllByCurrentUserAndFollowing(User currentUser, User following);

    List<Following> findAllByCurrentUser(User currentUser);
}
