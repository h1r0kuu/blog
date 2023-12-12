package com.pwgp.blog.controller;


import com.pwgp.blog.dto.post.PostCreationRequest;
import com.pwgp.blog.dto.post.PostDto;
import com.pwgp.blog.entity.User;
import com.pwgp.blog.mapper.PostMapper;
import com.pwgp.blog.service.PostService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.pwgp.blog.constants.PathConstants.*;

@RestController
@RequestMapping(API_V1_POSTS)
@AllArgsConstructor
public class PostController {

    private final PostService postService;
    private final PostMapper postMapper;


    @GetMapping(ALL_POSTS)
    public ResponseEntity<?> getAllPosts(){
        List<PostDto> posts = postService.FindAllPosts()
                .stream()
                .map(postMapper::mapToPostDto).collect(Collectors.toList());
        return ResponseEntity.status(200).body(posts);
    }

    @GetMapping(POST_BY_ID)
    public ResponseEntity<PostDto> getPost(@PathVariable("post_id") Long post_id) {
        return ResponseEntity.status(HttpStatus.OK).body(postMapper.findById(post_id));
    }

    @PostMapping("/create")
    public String savePost(@ModelAttribute("post") @Valid PostCreationRequest postCreationRequest, @AuthenticationPrincipal User user){
        if(user == null) return "redirect:/login";
        postCreationRequest.setCreator(user);
        postMapper.create(postCreationRequest);
        return "OK";
    }
}
