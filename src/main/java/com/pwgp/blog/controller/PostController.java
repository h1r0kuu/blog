package com.pwgp.blog.controller;



import com.pwgp.blog.dto.post.PostCreationRequest;
import com.pwgp.blog.dto.post.PostDto;
import com.pwgp.blog.entity.Post;
import com.pwgp.blog.mapper.PostMapper;
import com.pwgp.blog.service.PostService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<PostDto>> getAllPosts(){
        List<PostDto> posts = postService.FindAllPosts()
                .stream()
                .map(postMapper::mapToPostDto).collect(Collectors.toList());
        return ResponseEntity.status(200).body(posts);
    }

    @GetMapping(POST_BY_ID)
    public ResponseEntity<PostDto> getPost(@PathVariable("post_id") Long post_id) {
        return ResponseEntity.status(HttpStatus.OK).body(postMapper.mapToPostDto(postService.findById(post_id)));
    }
    @PostMapping(value = POST_CREATE, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Post> savePost(@ModelAttribute PostCreationRequest postCreationRequest) {
        Post savedPost = postService.createPost(postCreationRequest);
        return ResponseEntity.status(HttpStatus.OK).body(savedPost);
    }



}
