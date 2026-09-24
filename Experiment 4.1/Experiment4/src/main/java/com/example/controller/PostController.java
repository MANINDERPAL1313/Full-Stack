package com.example.experiment4.controller;

import com.example.experiment4.dto.ApiResponse;
import com.example.experiment4.entity.Post;
import com.example.experiment4.service.PostService;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "*")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Post>> createPost(
            @Valid @RequestBody Post post) {

        Post createdPost = postService.createPost(post);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Post created successfully",
                        createdPost
                )
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Post>>> getAllPosts() {

        List<Post> posts = postService.getAllPosts();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Posts retrieved successfully",
                        posts
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Post>> getPostById(
            @PathVariable Long id) {

        return postService.getPostById(id)
                .map(post -> ResponseEntity.ok(
                        new ApiResponse<>(
                                true,
                                "Post found successfully",
                                post
                        )
                ))
                .orElseGet(() -> ResponseEntity.status(404).body(
                        new ApiResponse<>(
                                false,
                                "Post not found",
                                null
                        )
                ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Post>> updatePost(
            @PathVariable Long id,
            @Valid @RequestBody Post post) {

        Post updatedPost = postService.updatePost(id, post);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Post updated successfully",
                        updatedPost
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePost(
            @PathVariable Long id) {

        postService.deletePost(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Post deleted successfully",
                        null
                )
        );
    }
}