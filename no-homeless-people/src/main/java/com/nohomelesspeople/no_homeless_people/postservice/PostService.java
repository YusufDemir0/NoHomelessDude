package com.nohomelesspeople.no_homeless_people.postservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private IPostRepository postRepository;

    /**
     * Yeni bir post oluşturur (veritabanına kaydeder).
     */
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    /**
     * Tüm postları döndürür.
     */
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    /**
     * ID'ye göre tekil post getirir.
     */
    public Post getPostById(String postId) {
        return postRepository.findById(postId).orElse(null);
    }

    public List<Post> getPostsByUsername(String username) {
        return postRepository.findByUsername(username);
    }

    // Post silme işlemi
    public void deletePost(String postId) {
        Optional<Post> postOptional = postRepository.findById(postId);
        if (postOptional.isPresent()) {
            postRepository.deleteById(postId);
        } else {
            throw new RuntimeException("Post not found with ID: " + postId);
        }
    }
}