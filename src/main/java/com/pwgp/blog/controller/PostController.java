package com.pwgp.blog.controller;



import com.pwgp.blog.dto.post.*;
import com.pwgp.blog.entity.Post;
import com.pwgp.blog.entity.Tag;
import com.pwgp.blog.entity.User;
import com.pwgp.blog.exception.UsernameNotFoundException;
import com.pwgp.blog.mapper.PostMapper;
import com.pwgp.blog.service.AuthenticationService;
import com.pwgp.blog.service.PostService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.pwgp.blog.constants.PathConstants.*;

@RestController
@RequestMapping(API_V1_POSTS)
@AllArgsConstructor
public class PostController {

    private final PostService postService;
    private final PostMapper postMapper;
    private final AuthenticationService authenticationService;


    @GetMapping(ALL_POSTS)
    public ResponseEntity<List<PostDto>> getAllPosts(){
        List<PostDto> posts = postService.FindAllPosts()
                .stream()
                .map(postMapper::mapToPostDto).collect(Collectors.toList());
        return ResponseEntity.status(200).body(posts);
    }

    @GetMapping(POST_BY_ID)
    public ResponseEntity<PostDto> getPost(@PathVariable("post_id") Long post_id) {
        Post post = postService.findById(post_id);
        if (post == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        postService.registerUserView(post);
        return ResponseEntity.status(HttpStatus.OK).body(postMapper.mapToPostDto(post));
    }

    @PostMapping(value = POST_CREATE, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Long> savePost(@ModelAttribute PostCreationRequest postCreationRequest) {
        Long savedPostId = postService.createPost(postCreationRequest).getId();
        return ResponseEntity.status(HttpStatus.OK).body(savedPostId);
    }

    @DeleteMapping(POST_DELETE)
    public ResponseEntity<Void> deletePost(@PathVariable("post_id") Long post_id) {
        try {
            postService.deletePost(post_id);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping(value = POST_UPDATE, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> updatePost(@PathVariable("post_id") Long post_id, @Valid @ModelAttribute PostUpdateRequest postUpdateRequest) {
        try{
            postService.updatePost(post_id, postUpdateRequest);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping(POST_MARK_UPDATE)
    public ResponseEntity<MarkUpdateResponse> updateMark(@Valid @RequestBody MarkUpdateRequest markUpdateRequest) {
        try{
            MarkUpdateResponse markUpdateResponse = postService.updateMark(markUpdateRequest);
            return ResponseEntity.status(HttpStatus.OK).body(markUpdateResponse);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping(SEARCH_POSTS)
    public ResponseEntity<List<PostDto>> searchPosts(@RequestParam(value = "q", required = false) String query,
                                                      @RequestParam(value = "tags", required = false) Set<String> tagNames){
        Set<Tag> tags = tagNames == null ? null : tagNames.stream()
                .map(postMapper::mapToTagEntity)
                .collect(Collectors.toSet());

        List<PostDto> posts = postService.searchPosts(query, tags);
        return ResponseEntity.status(200).body(posts);
    }

    @GetMapping(USER_POSTS)
    public ResponseEntity<List<PostDto>> findPostsByUser(@PathVariable("username") String username){
        return ResponseEntity.status(200).body(postService.findByUserUsername(username));
    }

    @GetMapping(GET_USER_FEED)
    public ResponseEntity<List<PostDto>> getUserFeed(){
        try{
            User user = authenticationService.getAuthenticatedUser();
            return ResponseEntity.status(200).body(postService.getUserFeed(user));
        }catch (UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}
