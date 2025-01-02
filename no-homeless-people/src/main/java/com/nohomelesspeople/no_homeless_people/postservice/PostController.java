package com.nohomelesspeople.no_homeless_people.postservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    /**
     * Yeni bir post oluşturma endpointi.
     * POST /api/posts
     *
     * Örneğin mobil uygulama, JSON body’de
     * {
     *   "username": "Egemen",
     *   "location": "40.7994362,29.9525459",
     *   "address": "XYZ Mahallesi",
     *   "description": "some one needs in there!!!",
     *   "needs": ["a", "b", "c"]
     * }
     * şeklinde gönderir.
     */
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post newPost) {
        Post savedPost = postService.createPost(newPost);
        return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
    }

    /**
     * Tüm postları döndürür.
     * GET /api/posts
     */
    @GetMapping
    public ResponseEntity<?> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    /**
     * Tekil post döndürür.
     * GET /api/posts/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable String id) {
        Post post = postService.getPostById(id);
        if (post == null) {
            return new ResponseEntity<>("Post not found", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(post);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<Post>> getPostsByUsername(@PathVariable String username) {
        List<Post> userPosts = postService.getPostsByUsername(username);
        return ResponseEntity.ok(userPosts);
    }

    // Post silme endpointi
    @DeleteMapping("/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable String postId) {
        try {
            postService.deletePost(postId);
            return ResponseEntity.ok("Post successfully deleted.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while deleting the post: " + e.getMessage());
        }
    }
}