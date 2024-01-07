package com.pwgp.blog.service;

import com.pwgp.blog.dto.post.*;
import com.pwgp.blog.entity.*;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Set;

@Service
public interface PostService {


    Page<Post> FindAllPosts(Pageable pageable);

    Tag findTagByName(String tagName);

    Post findPostById(Long id);

    void create(PostCreationRequest postCreationRequest);

    List<Tag> FindAllTags();

    Post findById(Long id);

    Post createPost(PostCreationRequest postCreationRequest);

    void registerUserView(Post post);

    MarkUpdateResponse updateMark(MarkUpdateRequest markUpdateRequest);

    void deletePost(Long id);

    void updatePost(Long post_id, PostUpdateRequest postUpdateRequest);

    List<PostDto> searchPosts(String searchQuery, Set<Tag> tags);

    List<PostDto> findByUserUsername(String username);

    List<PostDto> getUserFeed(User user);
}
