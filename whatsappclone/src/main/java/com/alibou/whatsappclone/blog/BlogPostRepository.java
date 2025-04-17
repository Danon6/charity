package com.alibou.whatsappclone.blog;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BlogPostRepository extends JpaRepository<BlogPost, String> {
    
    @Query("SELECT b FROM BlogPost b WHERE b.published = true ORDER BY b.createdDate DESC")
    List<BlogPost> findAllPublishedPosts();
    
    @Query("SELECT b FROM BlogPost b WHERE b.author.id = :userId ORDER BY b.createdDate DESC")
    List<BlogPost> findByAuthorId(@Param("userId") String userId);
} 