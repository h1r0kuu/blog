package com.pwgp.blog.service.impl;

import com.pwgp.blog.entity.*;
import com.pwgp.blog.repository.CategoryRepository;
import com.pwgp.blog.repository.PostRepository;
import com.pwgp.blog.repository.TagRepository;
import com.pwgp.blog.service.ImageService;
import com.pwgp.blog.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;

    @Override
    public List<Post> FindAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public Post findById(Long id) {
        return postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
    }
    @Override
    public Post create(Post post) {
        return postRepository.save(post);
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

    @Override
    public int calculateMarkValue(Set<Mark> marks){
        return (int) (marks.size() - marks.stream().filter(mark -> !mark.isStatus()).count());
    }

    @Override
    public int getPositiveMarksCount(Set<Mark> marks){
        return (int) marks.stream().filter(Mark::isStatus).count();
    }

    @Override
    public int getNegativeMarksCount(Set<Mark> marks){
        return (int) marks.stream().filter(mark -> !mark.isStatus()).count();
    }

}
