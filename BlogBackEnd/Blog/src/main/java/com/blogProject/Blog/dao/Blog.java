package com.blogProject.Blog.dao;

import javax.persistence.*;
import java.util.Date;


@Entity
public class Blog {
    @Id
    @GeneratedValue
    private Long postId;
    private Date date;
    private String title;
    @Column(length = 1000)
    private String content;
    private Boolean isPrivate = false;
    @OneToOne
    private User userId;

    public Long getPostId() { return postId; }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getUserId() { return userId; }

    public void setUserId(User userId) { this.userId = userId; }

    public Boolean getPrivate() {
        return isPrivate;
    }

    public void setPrivate(Boolean aPrivate) {
        isPrivate = aPrivate;
    }
}
