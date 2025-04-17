package com.alibou.whatsappclone.payment;

import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {
    
    public Payment toEntity(PaymentRequest request) {
        Payment payment = new Payment();
        payment.setAmount(request.getAmount());
        payment.setDonorName(request.getDonorName());
        payment.setDonorEmail(request.getDonorEmail());
        payment.setStatus("pending");
        return payment;
    }
    
    public PaymentResponse toResponse(Payment payment) {
        return PaymentResponse.builder()
                .id(payment.getId())
                .campaignId(payment.getCampaign().getId())
                .campaignTitle(payment.getCampaign().getTitle())
                .amount(payment.getAmount())
                .status(payment.getStatus())
                .donorName(payment.getDonorName())
                .donorEmail(payment.getDonorEmail())
                .createdDate(payment.getCreatedDate())
                .build();
    }
} 