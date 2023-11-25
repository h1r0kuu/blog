package com.pwgp.blog.mapper;

import com.pwgp.blog.dto.post.PostCreationRequest;
import com.pwgp.blog.entity.Post;
import com.pwgp.blog.service.ImageService;
import com.pwgp.blog.service.PostService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
@Data
public class PostMapper {


    private final PostService postService;
    private final ModelMapper modelMapper;
    private final ImageService imageService;


    public void create(PostCreationRequest postCreationRequest) {
        Post post = modelMapper.map(postCreationRequest, Post.class);
        String imageUrl = imageService.upload(postCreationRequest.getPoster());
        post.setPosterUrl(imageUrl);
        postService.create(post);
    }

    private Post mapToPostEntity(PostCreationRequest postCreationRequest){
        Post post = new Post();
        post.setTitle(postCreationRequest.getTitle());
        post.setBody(postCreationRequest.getBody());
        post.setCategory(postCreationRequest.getCategory());
        post.setTags(postCreationRequest.getTags());
        post.setCreator(postCreationRequest.getCreator());
        return post;
    }

}
