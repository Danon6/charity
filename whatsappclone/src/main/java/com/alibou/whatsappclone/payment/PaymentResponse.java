package com.alibou.whatsappclone.payment;

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
public class PaymentResponse {
    
    private String id;
    private String campaignId;
    private String campaignTitle;
    private BigDecimal amount;
    private String status;
    private String donorName;
    private String donorEmail;
    private LocalDateTime createdDate;
} 