package com.pwgp.blog.controller;


import com.pwgp.blog.dto.post.TagDto;
import com.pwgp.blog.mapper.PostMapper;
import com.pwgp.blog.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;
import static com.pwgp.blog.constants.PathConstants.*;

@RestController
@RequestMapping(API_V1_TAGS)
@AllArgsConstructor
public class TagController {

    private final PostMapper postMapper;
    private final PostService postService;

    @GetMapping(ALL_TAGS)
    public ResponseEntity<List<TagDto>> getAllTags(){
        List<TagDto> tags = postService.FindAllTags()
                .stream()
                .map(postMapper::mapToTagDto).collect(Collectors.toList());
        return ResponseEntity.status(200).body(tags);
    }

}
