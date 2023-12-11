package com.pwgp.blog.mapper;

import com.pwgp.blog.dto.post.CategoryDto;
import com.pwgp.blog.dto.post.PostCreationRequest;
import com.pwgp.blog.dto.post.PostDto;
import com.pwgp.blog.dto.post.TagDto;
import com.pwgp.blog.entity.Category;
import com.pwgp.blog.entity.Post;
import com.pwgp.blog.entity.Tag;
import com.pwgp.blog.service.ImageService;
import com.pwgp.blog.service.PostService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@AllArgsConstructor
@Data
public class PostMapper {


    private final PostService postService;
    private final UserMapper userMapper;
    private final ModelMapper modelMapper;
    private final ImageService imageService;



    public PostDto findById(Long id){
        Post post = postService.findById(id);
        return mapToPostDto(post);
    }

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


    private CategoryDto mapToCategoryDto(Category category){
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(category.getId());
        categoryDto.setName(category.getName());
        return categoryDto;
    }


    private TagDto mapToTagDto(Tag tag){
        TagDto tagDto = new TagDto();
        tagDto.setId(tag.getId());
        tagDto.setName(tag.getName());
        return tagDto;
    }

    public PostDto mapToPostDto(Post post){
        PostDto postDto = new PostDto();
        postDto.setId(post.getId());
        postDto.setTitle(post.getTitle());
        postDto.setBody(post.getBody());
        postDto.setPosterUrl(post.getPosterUrl());
        postDto.setCategory(mapToCategoryDto(post.getCategory()));
        postDto.setTags(post.getTags().stream().map(this::mapToTagDto).collect(Collectors.toSet()));
        postDto.setCreator(userMapper.mapToUserResponse(post.getCreator()));
        postDto.setViews(post.getViews().size());
        postDto.setMark(postService.calculateMarkValue(post.getMarks()));
        postDto.setPositiveMarks(postService.getPositiveMarksCount(post.getMarks()));
        postDto.setNegativeMarks(postService.getNegativeMarksCount(post.getMarks()));
        postDto.setCreatedAt(post.getCreatedAt());
        return postDto;



    }

}
