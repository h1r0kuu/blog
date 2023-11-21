package com.pwgp.blog.service.impl;

import com.pwgp.blog.dto.post.PostCreationRequest;
import com.pwgp.blog.entity.Category;
import com.pwgp.blog.entity.Post;
import com.pwgp.blog.entity.Tag;
import com.pwgp.blog.entity.User;
import com.pwgp.blog.mapper.PostMapper;
import com.pwgp.blog.repository.CategoryRepository;
import com.pwgp.blog.repository.PostRepository;
import com.pwgp.blog.repository.TagRepository;
import com.pwgp.blog.service.ImageService;
import com.pwgp.blog.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final ImageService imageService;

    @Override
    public List<Post> FindAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public Post create(Post post) {
        Post savedPost = postRepository.save(post);
        return savedPost;
    }

    @Override
    public List<Tag> FindAllTags() {
        return tagRepository.findAll();
    }

    @Override
    public List<Category> FindAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Post FindPostById(Long id) {
        return postRepository.getReferenceById(id);
    }

    @Override
    public void registerUserView(User user, Post post) {
        if(!postRepository.isUserViewed(user, post.getId())){
            post.getViews().add(user);
            postRepository.save(post);
        }
    }
}
