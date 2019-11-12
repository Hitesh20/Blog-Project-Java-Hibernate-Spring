package com.blogProject.Blog.repository;


import com.blogProject.Blog.dao.Blog;
import com.blogProject.Blog.dao.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {

    List<Blog> findAllByUserId(User user);

    String deleteByPostId(Long id);

    Blog getBlogByPostId(Long id);

}
