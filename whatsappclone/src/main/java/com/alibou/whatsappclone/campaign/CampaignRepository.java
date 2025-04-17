package com.alibou.whatsappclone.campaign;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CampaignRepository extends JpaRepository<Campaign, String> {
    
    @Query("SELECT c FROM Campaign c WHERE c.active = true ORDER BY c.createdDate DESC")
    List<Campaign> findAllActiveCampaigns();
    
    @Query("SELECT c FROM Campaign c WHERE c.creator.id = :userId ORDER BY c.createdDate DESC")
    List<Campaign> findByCreatorId(@Param("userId") String userId);
} 