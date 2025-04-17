package com.alibou.whatsappclone.payment;

import com.stripe.exception.StripeException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
@Tag(name = "Payment")
public class PaymentController {
    
    private final PaymentService paymentService;
    
    @PostMapping
    @Operation(summary = "Process a payment")
    public ResponseEntity<PaymentResponse> processPayment(@RequestBody PaymentRequest request) throws StripeException {
        return ResponseEntity.ok(paymentService.processPayment(request));
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get payment by ID")
    public ResponseEntity<PaymentResponse> getPaymentById(@PathVariable String id) {
        return ResponseEntity.ok(paymentService.getPaymentById(id));
    }
    
    @GetMapping("/campaign/{campaignId}")
    @Operation(summary = "Get all payments for a campaign")
    public ResponseEntity<List<PaymentResponse>> getCampaignPayments(@PathVariable String campaignId) {
        return ResponseEntity.ok(paymentService.getCampaignPayments(campaignId));
    }
} 