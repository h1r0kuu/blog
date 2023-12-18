package com.pwgp.blog.service.impl;

import com.pwgp.blog.dto.post.PostCreationRequest;
import com.pwgp.blog.entity.*;
import com.pwgp.blog.mapper.PostMapper;
import com.pwgp.blog.repository.PostRepository;
import com.pwgp.blog.repository.TagRepository;
import com.pwgp.blog.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final PostMapper postMapper;
    private final TagRepository tagRepository;

    @Override
    public List<Post> FindAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public Post findById(Long id) {
        return postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public Post createPost(PostCreationRequest postCreationRequest) {
        Post post = postMapper.mapToPostEntity(postCreationRequest);
        return postRepository.save(post);
    }

    @Override
    public List<Tag> FindAllTags() {
        return tagRepository.findAll();
    }

    @Override
    public Post FindPostById(Long id) {
        return postRepository.getReferenceById(id);
    }

    @Override
    public void create(PostCreationRequest postCreationRequest) {
        return;
    }

    @Override
    public void registerUserView(User user, Post post) {
        if(!postRepository.isUserViewed(user, post.getId())){
            post.getViews().add(user);
            postRepository.save(post);
        }
    }

}
