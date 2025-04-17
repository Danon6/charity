import { CommonModule } from '@angular/common';
import {
  Component, OnInit, AfterViewInit, OnDestroy,
  ViewChild, ElementRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CampaignService } from '../../services/services/campaign.service';
import { PaymentService }  from '../../services/services/payment.service';
import { Campaign }        from '../../services/models/campaign.model';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.scss'],
  imports: [ReactiveFormsModule,
    CommonModule
  ]
})
export class CampaignDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cardInfo') cardInfo!: ElementRef;

  campaign!: Campaign;
  donationForm!: FormGroup;
  loading     = true;
  processing  = false;
  errorMsg?: string;
  justDonated = false;

  private stripe!: Stripe;
  private card!: StripeCardElement;
  private sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private campaignSvc: CampaignService,
    private paymentSvc: PaymentService
  ) {}

  ngOnInit(): void {
    this.donationForm = this.fb.group({
      amount:     [null, [Validators.required, Validators.min(1)]],
      donorName:  ['', Validators.required],
      donorEmail: ['', [Validators.required, Validators.email]]
    });
  
    this.sub = this.route.paramMap.pipe(
      switchMap(params => {
        this.justDonated = this.route.snapshot.queryParamMap.get('donated') === 'true';
        return this.campaignSvc.getById(params.get('id')!);
      })
    ).subscribe({
      next: c => {
        this.campaign = c;
        this.loading = false;
  
        // ✅ Wait for DOM render, then mount Stripe
        setTimeout(() => this.initStripeCard(), 0);
      },
      error: () => {
        this.errorMsg = 'Could not load campaign';
        this.loading = false;
      }
    });
  }
  private initStripeCard() {
    console.log('🌀 Initializing Stripe...');
    loadStripe(environment.stripePublicKey).then(stripe => {
      if (!stripe) {
        console.error('❌ Stripe failed to load');
        this.errorMsg = 'Unable to load Stripe.';
        return;
      }
  
      this.stripe = stripe;
      const elements = this.stripe.elements();
      this.card = elements.create('card', {
        style: {
          base: {
            fontSize: '16px',
            color: '#32325d',
            '::placeholder': { color: '#a0aec0' }
          }
        }
      });
  
      this.card.mount(this.cardInfo.nativeElement);
      console.log('✅ Stripe card mounted');
    }).catch(err => {
      console.error('❌ Stripe init error:', err);
      this.errorMsg = 'Stripe initialization failed.';
    });
  }
    

  ngAfterViewInit(): void {
    // 3) Initialize Stripe and mount the Card Element
    loadStripe(environment.stripePublicKey).then(stripe => {
      this.stripe = stripe!;
      const elements = this.stripe.elements();
      this.card     = elements.create('card', { style: { base: { fontSize: '16px' } } });
      this.card.mount(this.cardInfo.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    if (this.card) {
      this.card.unmount();
    }
  }

  async onDonate() {
    if (this.donationForm.invalid) {
      this.donationForm.markAllAsTouched();
      return;
    }

    this.processing = true;
    this.errorMsg   = undefined;

    // 4) Create a PaymentMethod
    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.card,
      billing_details: {
        name:  this.donationForm.value.donorName,
        email: this.donationForm.value.donorEmail
      }
    });

    if (error) {
      this.errorMsg   = error.message!;
      this.processing = false;
      return;
    }

    // 5) Send to backend
    this.paymentSvc.process({
      campaignId:      this.campaign.id,
      amount:          this.donationForm.value.amount,
      donorName:       this.donationForm.value.donorName,
      donorEmail:      this.donationForm.value.donorEmail,
      paymentMethodId: paymentMethod!.id
    }).subscribe({
      next: () =>
        this.router.navigate(
          ['/campaigns', this.campaign.id],
          { queryParams: { donated: true } }
        ),
      error: () => {
        this.errorMsg   = 'Payment failed. Please try again.';
        this.processing = false;
      }
    });
  }
}
