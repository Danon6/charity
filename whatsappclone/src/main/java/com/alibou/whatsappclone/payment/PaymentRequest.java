package com.alibou.whatsappclone.payment;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequest {
    
    @NotBlank(message = "Campaign ID is required")
    private String campaignId;
    
    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    private BigDecimal amount;
    
    @NotBlank(message = "Donor name is required")
    private String donorName;
    
    @NotBlank(message = "Donor email is required")
    @Email(message = "Invalid email format")
    private String donorEmail;
    
    private String paymentMethodId;
} 