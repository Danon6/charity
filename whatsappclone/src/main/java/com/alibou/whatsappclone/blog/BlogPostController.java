package com.alibou.whatsappclone.blog;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/blog-posts")
@RequiredArgsConstructor
@Tag(name = "Blog")
public class BlogPostController {
    
    private final BlogPostService blogPostService;
    
    @PostMapping
    @Operation(summary = "Create a new blog post")
    public ResponseEntity<BlogPostResponse> createBlogPost(
            @RequestBody BlogPostRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(blogPostService.createBlogPost(request, authentication));
    }
    
    @GetMapping
    @Operation(summary = "Get all published blog posts")
    public ResponseEntity<List<BlogPostResponse>> getAllPublishedPosts() {
        return ResponseEntity.ok(blogPostService.getAllPublishedPosts());
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get blog post by ID")
    public ResponseEntity<BlogPostResponse> getBlogPostById(@PathVariable String id) {
        return ResponseEntity.ok(blogPostService.getBlogPostById(id));
    }
    
    @GetMapping("/my-posts")
    @Operation(summary = "Get user's blog posts")
    public ResponseEntity<List<BlogPostResponse>> getUserBlogPosts(Authentication authentication) {
        return ResponseEntity.ok(blogPostService.getUserBlogPosts(authentication));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing blog post")
    public ResponseEntity<BlogPostResponse> updateBlogPost(
            @PathVariable String id,
            @RequestBody BlogPostRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(blogPostService.updateBlogPost(id, request, authentication));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a blog post")
    public ResponseEntity<Void> deleteBlogPost(
            @PathVariable String id,
            Authentication authentication
    ) {
        blogPostService.deleteBlogPost(id, authentication);
        return ResponseEntity.noContent().build();
    }

}
