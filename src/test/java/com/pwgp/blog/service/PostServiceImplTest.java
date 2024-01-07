package com.pwgp.blog.service;

import com.pwgp.blog.dto.post.MarkUpdateRequest;
import com.pwgp.blog.dto.post.MarkUpdateResponse;
import com.pwgp.blog.dto.post.PostCreationRequest;
import com.pwgp.blog.entity.Mark;
import com.pwgp.blog.entity.Post;
import com.pwgp.blog.entity.Tag;
import com.pwgp.blog.entity.User;
import com.pwgp.blog.mapper.PostMapper;
import com.pwgp.blog.repository.MarkRepository;
import com.pwgp.blog.repository.PostRepository;
import com.pwgp.blog.repository.TagRepository;
import com.pwgp.blog.service.impl.PostServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PostServiceImplTest {

    @InjectMocks
    private PostServiceImpl postService;

    @Mock
    private PostRepository postRepository;

    @Mock
    private TagRepository tagRepository;

    @Mock
    private MarkRepository markRepository;

    @Mock
    private PostMapper postMapper;

    @Mock
    private AuthenticationService authenticationService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAllPosts() {
        List<Post> mockPosts = new ArrayList<>();
        when(postRepository.findAll(any(Pageable.class))).thenReturn(new PageImpl<>(mockPosts));

        Pageable pageable = PageRequest.of(0, 10);
        Page<Post> result = postService.FindAllPosts(pageable);

        assertEquals(new PageImpl<>(mockPosts), result);
    }

    @Test
    public void testCreatePost() {
        when(postMapper.mapToPostEntity(any(PostCreationRequest.class))).thenReturn(new Post());
        when(postRepository.save(any(Post.class))).thenReturn(new Post());

        Post result = postService.createPost(new PostCreationRequest());

        assertNotNull(result);
    }

    @Test
    public void testFindAllTags() {
        List<Tag> mockTags = new ArrayList<>();
        when(tagRepository.findAll()).thenReturn(mockTags);

        List<Tag> result = postService.FindAllTags();

        assertEquals(mockTags, result);
    }

    @Test
    public void testRegisterUserView() {
        when(authenticationService.getAuthenticatedUser()).thenReturn(new User());
        when(postRepository.isUserViewed(any(User.class), any(Long.class))).thenReturn(false);

        assertDoesNotThrow(() -> postService.registerUserView(new Post()));
    }

    @Test
    public void testUpdateMark() {
        when(authenticationService.getAuthenticatedUser()).thenReturn(new User());

//        // Mock the behavior of markRepository.findByPostIdAndUserId
//        when(markRepository.findByPostIdAndUserId(any(Long.class), any(Long.class))).thenReturn(Optional.of(new Post()));
        when(postRepository.findById(any(Long.class))).thenReturn(Optional.of(new Post()));
        when(markRepository.save(any(Mark.class))).thenReturn(new Mark());

        MarkUpdateResponse result = postService.updateMark(new MarkUpdateRequest());

        assertNotNull(result);
    }
}
