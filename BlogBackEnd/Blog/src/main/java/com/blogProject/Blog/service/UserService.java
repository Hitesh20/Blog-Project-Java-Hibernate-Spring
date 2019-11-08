package com.blogProject.Blog.service;


import com.blogProject.Blog.dao.Blog;
import com.blogProject.Blog.dao.User;
import com.blogProject.Blog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService {


    @Autowired
    UserRepository usersRepository;

    public User addUser(User user) { return usersRepository.save(user); }

    public Long getUserId(Principal principal) {
        String email = principal.getName();
        return usersRepository.findByEmail(email).getUserId();
    }

    public User callUser(Principal principal) {
        return usersRepository.findByEmail(principal.getName());
    }

    public User changeUserDetails(User users) {
        User oldUser = usersRepository.findByUserId(users.getUserId());
        oldUser.setUserId(users.getUserId());
        oldUser.setName(users.getName());
        oldUser.setEmail(users.getEmail());
        oldUser.setPassword(users.getPassword());
        oldUser.setMobileNo(users.getMobileNo());
        usersRepository.saveAndFlush(oldUser);
        return oldUser;
    }

    public Set<User> findUser(String searchedItem, Long id) {
        List<User> usersList = usersRepository.findAll();
        Set<User> result = new HashSet<>();
        User currentUser = usersRepository.findByUserId(id);

        for(int i=0; i<usersList.size(); i++) {
            if(id != usersList.get(i).getUserId()) {
                if(usersList.get(i).getName().toLowerCase().contains(searchedItem.toLowerCase()) ||
                        usersList.get(i).getEmail().toLowerCase().contains(searchedItem.toLowerCase()) ) {
                    result.add(usersList.get(i));
                }
            }
        }
        return result;
    }

    public User viewingUser(Long id) {
        return usersRepository.findByUserId(id);
    }
}
