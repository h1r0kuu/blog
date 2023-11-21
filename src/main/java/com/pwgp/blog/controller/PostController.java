package com.pwgp.blog.controller;


import com.pwgp.blog.dto.post.PostCreationRequest;
import com.pwgp.blog.entity.Category;
import com.pwgp.blog.entity.Post;
import com.pwgp.blog.entity.Tag;
import com.pwgp.blog.entity.User;
import com.pwgp.blog.mapper.PostMapper;
import com.pwgp.blog.service.PostService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.io.File;
import java.util.List;

@Controller
@AllArgsConstructor
public class PostController {

    private final PostService postService;
    private final PostMapper postMapper;


    @GetMapping("/")
    public String listPosts(Model model, @AuthenticationPrincipal User user){
        List<Post> posts = postService.FindAllPosts();
        model.addAttribute("posts", posts);
        model.addAttribute("user", user);
        return "index";
    }

    @GetMapping("/post/create")
    public  String createPost(Model model, @AuthenticationPrincipal User user){
        if(user == null) return "redirect:/login";
        List<Tag> tags = postService.FindAllTags();
        List<Category> categories = postService.FindAllCategories();
        model.addAttribute("tags", tags);
        model.addAttribute("categories", categories);
        model.addAttribute("post", new PostCreationRequest());
        model.addAttribute("user",user);
        return "post/post_create";
    }

    @PostMapping("/post/create")
    public String savePost(@ModelAttribute("post") @Valid PostCreationRequest postCreationRequest, @AuthenticationPrincipal User user){
        if(user == null) return "redirect:/login";
        postCreationRequest.setCreator(user);
        postMapper.create(postCreationRequest);
        return "redirect:/";
    }


    @GetMapping("/posts/{post_id}")
    public String renderPost(@PathVariable("post_id") Long post_id, Model model, @AuthenticationPrincipal User user){
        model.addAttribute("post", postService.FindPostById(post_id));
        model.addAttribute("user", user);
        return "post/post";
    }


}
