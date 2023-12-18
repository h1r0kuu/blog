package com.pwgp.blog.service;

import com.pwgp.blog.dto.post.PostCreationRequest;
import com.pwgp.blog.entity.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public interface PostService {


    List<Post> FindAllPosts();
    Post FindPostById(Long id);

    void create(PostCreationRequest postCreationRequest);

    List<Tag> FindAllTags();

    Post findById(Long id);

    void registerUserView(User user, Post post);

    Post createPost(PostCreationRequest postCreationRequest);
}
