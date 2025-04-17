package com.alibou.whatsappclone.campaign;

import com.alibou.whatsappclone.user.User;
import com.alibou.whatsappclone.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CampaignService {
    
    private final CampaignRepository campaignRepository;
    private final UserRepository userRepository;
    private final CampaignMapper campaignMapper;
    
    @Transactional
    public CampaignResponse createCampaign(CampaignRequest request, Authentication authentication) {
        User creator = userRepository.findById(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Campaign campaign = campaignMapper.toEntity(request);
        campaign.setCreator(creator);
        
        Campaign savedCampaign = campaignRepository.save(campaign);
        return campaignMapper.toResponse(savedCampaign);
    }
    
    public List<CampaignResponse> getAllActiveCampaigns() {
        return campaignRepository.findAllActiveCampaigns().stream()
                .map(campaignMapper::toResponse)
                .collect(Collectors.toList());
    }
    
    public CampaignResponse getCampaignById(String id) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
        return campaignMapper.toResponse(campaign);
    }
    
    public List<CampaignResponse> getUserCampaigns(Authentication authentication) {
        return campaignRepository.findByCreatorId(authentication.getName()).stream()
                .map(campaignMapper::toResponse)
                .collect(Collectors.toList());
    }
    @Transactional
    public CampaignResponse updateCampaign(String id, CampaignRequest request, Authentication authentication) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));

        if (!campaign.getCreator().getId().equals(authentication.getName())) {
            throw new RuntimeException("You are not authorized to update this campaign");
        }

        campaign.setTitle(request.getTitle());
        campaign.setDescription(request.getDescription());
        campaign.setTargetAmount(request.getTargetAmount()); // 🔁 mapping 'goal' from frontend to 'targetAmount'
        campaign.setImageUrl(request.getImageUrl());

        Campaign updated = campaignRepository.save(campaign);
        return campaignMapper.toResponse(updated);
    }
    @Transactional
    public void deleteCampaign(String id, Authentication authentication) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));

        // Only allow the owner to delete
        if (!campaign.getCreator().getId().equals(authentication.getName())) {
            throw new RuntimeException("You are not authorized to delete this campaign");
        }

        campaignRepository.delete(campaign);
    }


} 