package com.blogProject.Blog.controller;


import com.blogProject.Blog.dao.Blog;
import com.blogProject.Blog.service.BlogService;
import com.blogProject.Blog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.security.Principal;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class BlogController {

    @Autowired
    BlogService blogService;

    @Autowired
    UserService userService;

    @PostMapping("/addBlog")
    @ResponseBody
    public Blog addBlog(@RequestBody Blog blog, Principal principal) {
        return blogService.addBlog(blog, userService.getUserId(principal));
    }

    @GetMapping("/allBlogs")
    public List<Blog> getAllBlogs() { return blogService.getBlogList(); }

    @GetMapping("/myBlogs")
    public List<Blog> getMyBlogs(Principal principal) { return blogService.getMyBlogs(userService.getUserId(principal)); }

    @GetMapping("/deleteBlog/{id}")
    public List<Blog> deleteBlog(@PathVariable Long id) { return blogService.deleteParticularBlog(id); }

    @PostMapping("/editBlog")
    public Blog editBlog(@RequestBody Blog blog) { return blogService.editParticularBlog(blog); }

    @GetMapping("/getBlog/{id}")
    public Blog getBlog(@PathVariable Long id) { return blogService.getParticularBlog(id); }

    @GetMapping("/makePrivate/{id}")
    public List<Blog> makePrivate(@PathVariable Long id) {
        blogService.makeThisPrivate(id);
        return blogService.getBlogList();
    }

    @GetMapping("/search/{searchedItem}")
    public Set<Blog> searchItem(@PathVariable("searchedItem") String searchedItem) {
        Set<Blog> blog = blogService.getSearchedData(searchedItem);
        return blog;
    }

    @GetMapping("/viewBlogs/{userId}")
    public List<Blog> viewBlogs(@PathVariable Long userId) { return blogService.toView(userId); }

}
