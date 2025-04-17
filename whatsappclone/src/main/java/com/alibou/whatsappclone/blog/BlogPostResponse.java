package com.alibou.whatsappclone.blog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BlogPostResponse {
    
    private String id;
    private String title;
    private String content;
    private String authorId;
    private String authorName;
    private String imageUrl;
    private boolean published;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
} 