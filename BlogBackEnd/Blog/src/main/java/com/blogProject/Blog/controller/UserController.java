package com.blogProject.Blog.controller;

import com.blogProject.Blog.dao.Blog;
import com.blogProject.Blog.dao.User;
import com.blogProject.Blog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class UserController {

    @Autowired
    UserService userService;


    @GetMapping(path = "/validateLogin", produces = "application/json")
    public String validateLogin() { return "\"valid\""; }

    @PostMapping(value = "/addUsers")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @GetMapping("/callUser")
    public User callUsers(Principal principal)
    {
        return userService.callUser(principal);
    }

    @PostMapping("/editUser")
    public User editUsers(@RequestBody User user)
    {
        return userService.changeUserDetails(user);
    }

    @GetMapping("/viewUser/{id}")
    public User viewUser(@PathVariable Long id)
    {
        return userService.viewingUser(id);
    }

    @GetMapping("/searchUser/{searchedItem}")
    public Set<User> searchUser(@PathVariable("searchedItem") String searchedItem, Principal principal) {
        Set<User> users = userService.findUser(searchedItem, userService.getUserId(principal));
        return users;
    }
}
