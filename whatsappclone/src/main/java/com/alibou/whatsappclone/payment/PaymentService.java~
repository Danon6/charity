package com.alibou.whatsappclone.payment;

import com.alibou.whatsappclone.campaign.Campaign;
import com.alibou.whatsappclone.campaign.CampaignRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentService {
    
    @Value("${stripe.secret-key}")
    private String stripeSecretKey;
    
    private final PaymentRepository paymentRepository;
    private final CampaignRepository campaignRepository;
    private final PaymentMapper paymentMapper;
    
    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }
    
    @Transactional
    public PaymentResponse processPayment(PaymentRequest request) throws StripeException {
        Campaign campaign = campaignRepository.findById(request.getCampaignId())
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
        
        // Create payment intent
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(request.getAmount().multiply(BigDecimal.valueOf(100)).longValue())
                .setCurrency("usd")
                .setPaymentMethod(request.getPaymentMethodId())
                .setConfirm(true)
                .build();
        
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        
        // Create payment record
        Payment payment = paymentMapper.toEntity(request);
        payment.setCampaign(campaign);
        payment.setPaymentIntentId(paymentIntent.getId());
        payment.setStatus(paymentIntent.getStatus());
        
        Payment savedPayment = paymentRepository.save(payment);
        
        // Update campaign current amount
        campaign.setCurrentAmount(campaign.getCurrentAmount().add(request.getAmount()));
        campaignRepository.save(campaign);
        
        return paymentMapper.toResponse(savedPayment);
    }
    
    public PaymentResponse getPaymentById(String id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        return paymentMapper.toResponse(payment);
    }
    
    public List<PaymentResponse> getCampaignPayments(String campaignId) {
        return paymentRepository.findByCampaignId(campaignId).stream()
                .map(paymentMapper::toResponse)
                .collect(Collectors.toList());
    }
} 