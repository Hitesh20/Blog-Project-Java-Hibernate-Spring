package com.blogProject.Blog.service;


import com.blogProject.Blog.dao.Blog;
import com.blogProject.Blog.dao.Comment;
import com.blogProject.Blog.dao.User;
import com.blogProject.Blog.repository.BlogRepository;
import com.blogProject.Blog.repository.CommentRepository;
import com.blogProject.Blog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private CommentRepository commentRepository;

    public Comment postComment(Comment comment, Long userId) {
        User currentUser = userRepository.findByUserId(userId);
        comment.setUser(currentUser);
        return commentRepository.save(comment);

    }

    public List<Comment> getCommentsOfParticularPost(Long id) {
        Blog currentBlog = blogRepository.getBlogByPostId(id);
        return commentRepository.findAllByBlog(currentBlog);
    }
}
