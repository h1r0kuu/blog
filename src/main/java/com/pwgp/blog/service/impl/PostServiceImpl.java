package com.pwgp.blog.service.impl;

import com.pwgp.blog.dto.post.*;
import com.pwgp.blog.entity.*;
import com.pwgp.blog.mapper.PostMapper;
import com.pwgp.blog.repository.MarkRepository;
import com.pwgp.blog.repository.PostRepository;
import com.pwgp.blog.repository.TagRepository;
import com.pwgp.blog.service.AuthenticationService;
import com.pwgp.blog.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final TagRepository tagRepository;
    private final MarkRepository markRepository;
    private final PostMapper postMapper;
    private final AuthenticationService authenticationService;

    @Override
    public Page<Post> FindAllPosts(Pageable pageable) {
        return postRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

    @Override
    public Post findById(Long id) {
        return postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public Post createPost(PostCreationRequest postCreationRequest) {
        Post post = postMapper.mapToPostEntity(postCreationRequest);
        return postRepository.save(post);
    }

    @Override
    public List<Tag> FindAllTags() {
        return tagRepository.findAll();
    }

    @Override
    public Tag findTagByName(String tagName){
        return tagRepository.findByNameIgnoreCase(tagName);
    }

    @Override
    public Post findPostById(Long id) {
        return postRepository.getReferenceById(id);
    }

    @Override
    public void create(PostCreationRequest postCreationRequest) {
        return;
    }

    @Override
    public void registerUserView(Post post) {
        try{
            User user = authenticationService.getAuthenticatedUser();
            if(!postRepository.isUserViewed(user, post.getId())){
                post.getViews().add(user);
                postRepository.save(post);
            }
        }
        catch(Exception e){
            return;
        }
    }

    @Override
    public MarkUpdateResponse updateMark(MarkUpdateRequest markUpdateRequest) {
        try {
            User user = authenticationService.getAuthenticatedUser();
            Optional<Mark> markOptional = Optional.ofNullable(markRepository.findByPostIdAndUserId(markUpdateRequest.getPostId(), user.getId()));
            MarkUpdateResponse markUpdateResponse = new MarkUpdateResponse();

            if (markOptional.isPresent() && markUpdateRequest.getStatus() == null) {
                markRepository.delete(markOptional.get());
            } else {
                Mark mark = markOptional.orElseGet(() -> new Mark().builder()
                        .post(findById(markUpdateRequest.getPostId()))
                        .user(user)
                        .build());
                mark.setStatus(markUpdateRequest.getStatus());
                markRepository.save(mark);
            }

            Post post = findById(markUpdateRequest.getPostId());
            setMarkUpdateResponse(markUpdateResponse, post, markUpdateRequest.getStatus());

            return markUpdateResponse;
        }catch (Exception e){
            throw new RuntimeException("User Not Logged In");
        }
    }

    private void setMarkUpdateResponse(MarkUpdateResponse markUpdateResponse, Post post, Boolean status) {
        markUpdateResponse.setPositiveMarks(postMapper.getPositiveMarksCount(post.getMarks()));
        markUpdateResponse.setNegativeMarks(postMapper.getNegativeMarksCount(post.getMarks()));
        markUpdateResponse.setMarkStatus(status);
    }

    @Override
    public void deletePost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        if(authenticationService.getAuthenticatedUser() != post.getCreator()){
            throw new RuntimeException("User not authorized");
        }
        postRepository.deleteById(id);
    }

    @Override
    public void updatePost(Long post_id, PostUpdateRequest postUpdateRequest){
        Post post = postRepository.findById(post_id).orElseThrow(() -> new RuntimeException("Post not found"));
        if(authenticationService.getAuthenticatedUser() != post.getCreator()){
            throw new RuntimeException("User not authorized");
        }
        post = postMapper.mapToPostEntity(post, postUpdateRequest);
        postRepository.save(post);
    }

    @Override
    public List<PostDto> searchPosts(String searchQuery, Set<Tag> tags) {
        List<Long> tagIds = tags == null ? null : tags.stream()
                .map(Tag::getId)
                .collect(Collectors.toList());

        if(searchQuery == null && tags == null){
            return postRepository.findAll().stream()
                    .map(postMapper::mapToPostDto).collect(Collectors.toList());
        }
        else if(searchQuery == null){
            return findAllByTagsIn(tags).stream()
                    .map(postMapper::mapToPostDto).collect(Collectors.toList());
        }
        else if(tags == null){
            return postRepository.findByTitleContainingIgnoreCaseOrderByCreatedAtDesc(searchQuery).stream()
                    .map(postMapper::mapToPostDto).collect(Collectors.toList());
        }
        else{
            return findAllByTitleContainingIgnoreCaseAndTagsIn(searchQuery, tags).stream()
                    .map(postMapper::mapToPostDto).collect(Collectors.toList());
        }
    }

    @Override
    public List<PostDto> findByUserUsername(String username) {
        return postRepository.findByCreatorUsername(username).stream()
                .map(postMapper::mapToPostDto).collect(Collectors.toList());
    }

    private List<Post> findAllByTagsIn(Set<Tag> tagIds) {
        List<Post> posts = postRepository.findAllByTagsInOrderByCreatedAtDesc(tagIds);
        return posts.stream()
                .filter(post -> post.getTags().containsAll(tagIds))
                .collect(Collectors.toList());
    }

    private List<Post> findAllByTitleContainingIgnoreCaseAndTagsIn(String title, Set<Tag> tagIds) {
        List<Post> posts = postRepository.findAllByTitleContainingIgnoreCaseAndTagsInOrderByCreatedAtDesc(title, tagIds);
        return posts.stream()
                .filter(post -> post.getTags().containsAll(tagIds))
                .collect(Collectors.toList());
    }


    @Override
    public List<PostDto> getUserFeed(User user) {
        Set<User> followings = user.getFollowings().stream()
                .map(Follow::getFollowing)
                .collect(Collectors.toSet());

        List<PostDto> posts = followings.stream()
                .map(User::getPosts)
                .flatMap(Set::stream)
                .sorted(Comparator.comparing(Post::getCreatedAt).reversed())
                .map(postMapper::mapToPostDto)
                .collect(Collectors.toList());

        return posts;
    }

}
