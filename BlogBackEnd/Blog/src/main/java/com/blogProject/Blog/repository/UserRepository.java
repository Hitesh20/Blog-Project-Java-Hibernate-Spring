package com.blogProject.Blog.repository;


import com.blogProject.Blog.dao.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    User findByUserId(Long user_id);

    User getByEmail(String name);
}
