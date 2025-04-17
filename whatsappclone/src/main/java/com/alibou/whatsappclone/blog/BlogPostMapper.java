package com.alibou.whatsappclone.blog;

import org.springframework.stereotype.Component;

@Component
public class BlogPostMapper {
    
    public BlogPost toEntity(BlogPostRequest request) {
        BlogPost blogPost = new BlogPost();
        blogPost.setTitle(request.getTitle());
        blogPost.setContent(request.getContent());
        blogPost.setImageUrl(request.getImageUrl());
        blogPost.setPublished(request.isPublished());
        return blogPost;
    }
    
    public BlogPostResponse toResponse(BlogPost blogPost) {
        return BlogPostResponse.builder()
                .id(blogPost.getId())
                .title(blogPost.getTitle())
                .content(blogPost.getContent())
                .authorId(blogPost.getAuthor().getId())
                .authorName(blogPost.getAuthor().getFirstName() + " " + blogPost.getAuthor().getLastName())
                .imageUrl(blogPost.getImageUrl())
                .published(blogPost.isPublished())
                .createdDate(blogPost.getCreatedDate())
                .lastModifiedDate(blogPost.getLastModifiedDate())
                .build();
    }
} 