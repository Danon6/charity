package com.alibou.whatsappclone.campaign;

import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
public class CampaignMapper {
    
    public Campaign toEntity(CampaignRequest request) {
        Campaign campaign = new Campaign();
        campaign.setTitle(request.getTitle());
        campaign.setDescription(request.getDescription());
        campaign.setTargetAmount(request.getTargetAmount());
        campaign.setCurrentAmount(BigDecimal.ZERO);
        campaign.setImageUrl(request.getImageUrl());
        campaign.setActive(true);
        return campaign;
    }
    
    public CampaignResponse toResponse(Campaign campaign) {
        return CampaignResponse.builder()
                .id(campaign.getId())
                .title(campaign.getTitle())
                .description(campaign.getDescription())
                .targetAmount(campaign.getTargetAmount())
                .currentAmount(campaign.getCurrentAmount())
                .creatorId(campaign.getCreator().getId())
                .creatorName(campaign.getCreator().getFirstName() + " " + campaign.getCreator().getLastName())
                .imageUrl(campaign.getImageUrl())
                .active(campaign.isActive())
                .createdDate(campaign.getCreatedDate())
                .lastModifiedDate(campaign.getLastModifiedDate())
                .build();
    }
} 