package com.nohomelesspeople.no_homeless_people.postservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
        post.setCreateTime(LocalDateTime.now());
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

    // creator.username'e göre sorgu yapıyoruz
    public List<Post> getPostsByUsername(String username) {
        return postRepository.findByCreatorUsername(username);
    }

    public void deletePost(String postId) {
        Optional<Post> postOptional = postRepository.findById(postId);
        if (postOptional.isPresent()) {
            postRepository.deleteById(postId);
        } else {
            throw new RuntimeException("Post not found with ID: " + postId);
        }
    }

    /**
     * Kullanıcının eski username değerine sahip tüm postları bulup
     * creator alanındaki username/photo bilgilerini günceller.
     */
    public void updatePostsCreatorInfo(String oldUsername,
                                       String newUsername,
                                       String oldPhoto,
                                       String newPhoto)
    {
        List<Post> posts = postRepository.findByCreatorUsername(oldUsername);

        for (Post post : posts) {
            if (!oldUsername.equals(newUsername)) {
                post.getCreator().setUsername(newUsername);
            }
            if (!oldPhoto.equals(newPhoto)) {
                post.getCreator().setPhoto(newPhoto);
            }
        }

        postRepository.saveAll(posts);

    }
}