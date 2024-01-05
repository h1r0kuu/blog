package com.pwgp.blog.mapper;

import com.pwgp.blog.dto.post.PostCreationRequest;
import com.pwgp.blog.dto.post.PostUpdateRequest;
import com.pwgp.blog.dto.post.PostDto;
import com.pwgp.blog.dto.post.TagDto;

import java.util.HashSet;
import java.util.Optional;
import com.pwgp.blog.entity.Mark;
import com.pwgp.blog.entity.Post;
import com.pwgp.blog.entity.Tag;
import com.pwgp.blog.entity.User;
import com.pwgp.blog.helper.UserServiceHelper;
import com.pwgp.blog.repository.MarkRepository;
import com.pwgp.blog.repository.TagRepository;
import com.pwgp.blog.service.AuthenticationService;
import com.pwgp.blog.service.ImageService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
@Data
public class PostMapper {

    private final UserMapper userMapper;
    private final ModelMapper modelMapper;
    private final ImageService imageService;
    private final TagRepository tagRepository;
    private final MarkRepository markRepository;
    private final AuthenticationService authenticationService;
    private final UserServiceHelper userServiceHelper;


    public Post mapToPostEntity(PostCreationRequest postCreationRequest){
        Post post = modelMapper.map(postCreationRequest, Post.class);
        post.setTags(postCreationRequest.getTagIds().stream()
                .map(tagRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet()));
        post.setCreator(userMapper.findUserByUsername(postCreationRequest.getCreatorUsername()));
        post.setPosterUrl(imageService.upload(postCreationRequest.getPoster()));
        return post;
    }

    public Post mapToPostEntity(Post post, PostUpdateRequest postUpdateRequest){
        if(postUpdateRequest.getPoster() != null){
            post.setPosterUrl(imageService.upload(postUpdateRequest.getPoster()));
        }
        post.setTitle(postUpdateRequest.getTitle());
        post.setBody(postUpdateRequest.getBody());
        post.setDescription(postUpdateRequest.getDescription());
        post.setTags(postUpdateRequest.getTagIds().stream()
                .map(tagRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet()));



        return post;
    }

    public TagDto mapToTagDto(Tag tag){
        TagDto tagDto = new TagDto();
        tagDto.setId(tag.getId());
        tagDto.setName(tag.getName());
        return tagDto;
    }
    public PostDto mapToPostDto(Post post){
        PostDto postDto = new PostDto();
        Set<Mark> marks = post.getMarks();
        try{
            User user = authenticationService.getAuthenticatedUser();
            postDto.setIsMyProfileSubscribed(userServiceHelper.isUserSubscribed(post.getCreator().getUsername()));
        }
        catch (Exception e){
            postDto.setIsMyProfileSubscribed(null);
        }

        postDto.setId(post.getId());
        postDto.setTitle(post.getTitle());
        postDto.setBody(post.getBody());
        postDto.setPosterUrl(post.getPosterUrl());
        postDto.setDescription(post.getDescription());
        postDto.setTags(post.getTags().stream().map(this::mapToTagDto).collect(Collectors.toSet()));
        postDto.setCreator(userMapper.mapToUserResponse(post.getCreator()));
        postDto.setViews(post.getViews().size());
        postDto.setMark(calculateMarkValue(marks));
        postDto.setPositiveMarks(getPositiveMarksCount(marks));
        postDto.setNegativeMarks(getNegativeMarksCount(marks));
        postDto.setMarkStatus(GetUserMarkStatus(post.getId()));
        postDto.setCreatedAt(post.getCreatedAt());
        return postDto;
    }

    public int calculateMarkValue(Set<Mark> marks){
        return (getPositiveMarksCount(marks) - getNegativeMarksCount(marks));
    }

    public int getPositiveMarksCount(Set<Mark> marks){
        return (int) marks.stream().filter(Mark::isStatus).count();
    }

    public int getNegativeMarksCount(Set<Mark> marks){
        return (int) marks.stream().filter(mark -> !mark.isStatus()).count();
    }

    private Boolean GetUserMarkStatus(Long postId) {
        try{
            User user = authenticationService.getAuthenticatedUser();
            Optional<Mark> markOptional = Optional.ofNullable(markRepository.findByPostIdAndUserId(postId, user.getId()));
            return markOptional.isPresent() ? markOptional.get().isStatus() : null;
        }catch (Exception e){
            return null;
        }
    }

}
