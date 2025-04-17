package com.alibou.whatsappclone.campaign;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CampaignResponse {
    
    private String id;
    private String title;
    private String description;
    private BigDecimal targetAmount;
    private BigDecimal currentAmount;
    private String creatorId;
    private String creatorName;
    private String imageUrl;
    private boolean active;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
} 