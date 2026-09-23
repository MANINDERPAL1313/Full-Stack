package com.example.experiment5.service;

import com.example.experiment5.model.Post;
import com.example.experiment5.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private final PostRepository repository;

    public PostService(PostRepository repository) {
        this.repository = repository;
    }

    public List<Post> getAllPosts() {
        return repository.findAll();
    }

    public Post getPostById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public Post createPost(Post post) {
        return repository.save(post);
    }

    public Post updatePost(Long id, Post post) {
        Post existing = getPostById(id);

        existing.setTitle(post.getTitle());
        existing.setContent(post.getContent());

        return repository.save(existing);
    }

    public void deletePost(Long id) {
        Post existing = getPostById(id);
        repository.delete(existing);
    }
}