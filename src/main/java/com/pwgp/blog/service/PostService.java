package com.pwgp.blog.service;

import com.pwgp.blog.dto.post.*;
import com.pwgp.blog.entity.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PostService {


    List<Post> FindAllPosts();
    Post FindPostById(Long id);

    void create(PostCreationRequest postCreationRequest);

    List<Tag> FindAllTags();

    Post findById(Long id);

    Post createPost(PostCreationRequest postCreationRequest);

    void registerUserView(Post post);

    MarkUpdateResponse updateMark(MarkUpdateRequest markUpdateRequest);

    void deletePost(Long id);

    void updatePost(Long post_id, PostUpdateRequest postUpdateRequest);

    List<PostDto> searchPosts(String searchQuery);
}
