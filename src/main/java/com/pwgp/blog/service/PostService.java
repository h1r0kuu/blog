package com.pwgp.blog.service;

import com.pwgp.blog.entity.Category;
import com.pwgp.blog.entity.Post;
import com.pwgp.blog.entity.Tag;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PostService {


    List<Post> FindAllPosts();
    Post FindPostById(Long id);
    List<Tag> FindAllTags();
    List<Category> FindAllCategories();
    Post create(Post post);

}
