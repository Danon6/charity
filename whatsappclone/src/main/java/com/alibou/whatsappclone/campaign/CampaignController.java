package com.alibou.whatsappclone.campaign;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/campaigns")
@RequiredArgsConstructor
@Tag(name = "Campaign")
public class CampaignController {
    
    private final CampaignService campaignService;
    
    @PostMapping
    @Operation(summary = "Create a new campaign")
    public ResponseEntity<CampaignResponse> createCampaign(
            @RequestBody CampaignRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(campaignService.createCampaign(request, authentication));
    }
    
    @GetMapping
    @Operation(summary = "Get all active campaigns")
    public ResponseEntity<List<CampaignResponse>> getAllActiveCampaigns() {
        return ResponseEntity.ok(campaignService.getAllActiveCampaigns());
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get campaign by ID")
    public ResponseEntity<CampaignResponse> getCampaignById(@PathVariable String id) {
        return ResponseEntity.ok(campaignService.getCampaignById(id));
    }
    
    @GetMapping("/my-campaigns")
    @Operation(summary = "Get user's campaigns")
    public ResponseEntity<List<CampaignResponse>> getUserCampaigns(Authentication authentication) {
        return ResponseEntity.ok(campaignService.getUserCampaigns(authentication));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing campaign")
    public ResponseEntity<CampaignResponse> updateCampaign(
            @PathVariable String id,
            @RequestBody CampaignRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(campaignService.updateCampaign(id, request, authentication));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a campaign")
    public ResponseEntity<Void> deleteCampaign(
            @PathVariable String id,
            Authentication authentication
    ) {
        campaignService.deleteCampaign(id, authentication);
        return ResponseEntity.noContent().build(); // 204 No Content
    }

} 