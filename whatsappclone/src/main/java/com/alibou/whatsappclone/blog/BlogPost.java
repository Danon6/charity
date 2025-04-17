package com.alibou.whatsappclone.blog;

import com.alibou.whatsappclone.common.BaseAuditingEntity;
import com.alibou.whatsappclone.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "blog_posts")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BlogPost extends BaseAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    
    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;
    
    private String imageUrl;
    
    private boolean published;
} 