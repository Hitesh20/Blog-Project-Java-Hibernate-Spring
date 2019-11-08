package com.blogProject.Blog.service;


import com.blogProject.Blog.dao.Blog;
import com.blogProject.Blog.dao.User;
import com.blogProject.Blog.repository.BlogRepository;
import com.blogProject.Blog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class BlogService {

    @Autowired
    BlogRepository blogRepository;

    @Autowired
    UserRepository userRepository;


    public Blog addBlog(Blog blog, Long userId) {
        User currentUser = userRepository.findByUserId(userId);
        blog.setUserId(currentUser);
        return blogRepository.save(blog);

    }

    public List<Blog> getBlogList() {
        return blogRepository.findAll();
    }

    public List<Blog> getMyBlogs(Long userId) {
        User currentUser = userRepository.findByUserId(userId);
        return blogRepository.findAllByUserId(currentUser);
    }

    public List<Blog> deleteParticularBlog(Long id) {
        blogRepository.deleteByPostId(id);
        return blogRepository.findAll();
    }

    public Blog editParticularBlog(Blog blog) {
        Blog oldBlog = blogRepository.getBlogByPostId(blog.getPostId());
        oldBlog.setContent(blog.getContent());
        oldBlog.setTitle(blog.getTitle());
        oldBlog.setPostId(blog.getPostId());
        blogRepository.saveAndFlush(oldBlog);
        return oldBlog;
    }

    public Blog getParticularBlog(Long id) {
        return blogRepository.getBlogByPostId(id);
    }

    public void makeThisPrivate(Long id) {
        Blog oldBlog = blogRepository.getBlogByPostId(id);
        oldBlog.setPostId(id);
        oldBlog.setPrivate(true);
        blogRepository.saveAndFlush(oldBlog);
    }

    public Set<Blog> getSearchedData(String searchedItem) {
        List<Blog> blogsList = blogRepository.findAll();
        Set<Blog> result = new HashSet<>();

        for(int i=0; i<blogsList.size(); i++) {
            if(blogsList.get(i).getTitle().toLowerCase().contains(searchedItem.toLowerCase()) ||
                    blogsList.get(i).getContent().toLowerCase().contains(searchedItem.toLowerCase()) ||
                    blogsList.get(i).getUserId().getName().toLowerCase().contains(searchedItem.toLowerCase()) ||
                    blogsList.get(i).getDate().toString().toLowerCase().split(" ")[0].contains(searchedItem.toLowerCase())) {
                result.add(blogsList.get(i));
            }
        }
        return result;
    }

    public List<Blog> toView(Long userId) {
        User viewUser = userRepository.findByUserId(userId);
        return blogRepository.findAllByUserId(viewUser);
    }
}
