package com.blogProject.Blog.repository;

import com.blogProject.Blog.dao.Blog;
import com.blogProject.Blog.dao.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByBlog(Blog blog);
}
