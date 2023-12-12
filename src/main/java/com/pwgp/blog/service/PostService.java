package com.pwgp.blog.service;

import com.pwgp.blog.entity.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public interface PostService {


    List<Post> FindAllPosts();
    Post FindPostById(Long id);
    List<Tag> FindAllTags();
    List<Category> FindAllCategories();

    Post findById(Long id);

    Post create(Post post);

    void registerUserView(User user, Post post);

    int calculateMarkValue(Set<Mark> marks);

    int getPositiveMarksCount(Set<Mark> marks);

    int getNegativeMarksCount(Set<Mark> marks);
}
