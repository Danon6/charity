package com.alibou.whatsappclone.payment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, String> {
    
    @Query("SELECT p FROM Payment p WHERE p.campaign.id = :campaignId ORDER BY p.createdDate DESC")
    List<Payment> findByCampaignId(@Param("campaignId") String campaignId);
    
    @Query("SELECT p FROM Payment p WHERE p.paymentIntentId = :paymentIntentId")
    Payment findByPaymentIntentId(@Param("paymentIntentId") String paymentIntentId);
} 