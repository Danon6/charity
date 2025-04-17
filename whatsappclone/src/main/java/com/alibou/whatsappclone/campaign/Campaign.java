package com.alibou.whatsappclone.campaign;

import com.alibou.whatsappclone.common.BaseAuditingEntity;
import com.alibou.whatsappclone.payment.Payment;
import com.alibou.whatsappclone.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "campaigns")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Campaign extends BaseAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private BigDecimal targetAmount;
    
    private BigDecimal currentAmount;
    
    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator;
    
    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL)
    private List<Payment> payments;
    
    private String imageUrl;
    
    private boolean active;
} 