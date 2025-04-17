import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CampaignService } from '../../services/campaign.service';
import { PaymentService } from '../../services/payment.service'; // Ensuring correct path
import { Campaign } from '../../models/campaign.model';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { KeycloakService } from '../../utils/keycloak/keycloak.service';

@Component({
  selector: 'app-campaign-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    CurrencyPipe,
    DecimalPipe
  ],
  template: `
    <div class="campaign-detail-container">
      <div class="loading-spinner" *ngIf="loading">
        <mat-spinner></mat-spinner>
      </div>

      <div class="error-message" *ngIf="error">
        <mat-card class="error-card">
          <mat-card-content>
            <mat-icon>error_outline</mat-icon>
            <p>{{ error }}</p>
            <button mat-button routerLink="/campaigns">Back to Campaigns</button>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-card class="campaign-detail-card" *ngIf="campaign && !loading && !error">
        <img mat-card-image [src]="campaign.imageUrl || 'assets/default-campaign.jpg'" [alt]="campaign.title">
        <mat-card-header>
          <mat-card-title>{{ campaign.title }}</mat-card-title>
          <mat-card-subtitle>Created by {{ campaign.creatorName || 'Unknown' }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>{{ campaign.description }}</p>
          <div class="progress-section">
            <mat-progress-bar mode="determinate" [value]="progressPercentage"></mat-progress-bar>
            <div class="progress-text">
              <span>{{ campaign.currentAmount | currency:'USD':'symbol':'1.2-2' }} raised</span>
              <span>Target: {{ campaign.targetAmount | currency:'USD':'symbol':'1.2-2' }}</span>
            </div>
            <div class="progress-percentage">
              {{ progressPercentage | number:'1.0-0' }}% funded
            </div>
          </div>

          <div class="donation-section" *ngIf="keycloakService.isTokenValid">
            <h3>Make a Donation</h3>
            <mat-form-field appearance="fill">
              <mat-label>Amount</mat-label>
              <input matInput type="number" [(ngModel)]="donationAmount" placeholder="Enter amount" min="1">
              <span matTextPrefix>$&nbsp;</span>
              <span matTextSuffix>.00</span>
            </mat-form-field>
            <button mat-raised-button color="primary" (click)="makeDonation()" [disabled]="!donationAmount || donationAmount <= 0 || isDonating">
              <span *ngIf="isDonating">
                <mat-spinner diameter="20"></mat-spinner> Processing...
              </span>
              <span *ngIf="!isDonating">Donate Now</span>
            </button>
          </div>
          <div *ngIf="!keycloakService.isTokenValid">
            <p>Please <a routerLink="/login">log in</a> to make a donation.</p>
          </div>

        </mat-card-content>
        <mat-card-actions>
          <button mat-button routerLink="/campaigns">
            <mat-icon>arrow_back</mat-icon>
            Back to Campaigns
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .campaign-detail-container {
      max-width: 900px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    .loading-spinner, .error-message {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;
      text-align: center;
    }
    .error-card {
      background-color: #ffebee;
      color: #c62828;
      padding: 1rem;
      mat-icon {
        vertical-align: middle;
        margin-right: 0.5rem;
      }
    }
    img[mat-card-image] {
      height: 400px;
      object-fit: cover;
    }
    mat-card-header {
      padding-bottom: 1rem;
    }
    .progress-section {
      margin: 2rem 0;
    }
    .progress-text {
      display: flex;
      justify-content: space-between;
      margin-top: 0.5rem;
      font-size: 0.9rem;
      color: #666;
    }
    .progress-percentage {
      text-align: center;
      font-weight: bold;
      margin-top: 0.5rem;
      color: #3f51b5; /* Primary color */
    }
    .donation-section {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid #eee;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      h3 {
        margin-bottom: 1rem;
      }
      mat-form-field {
        width: 200px;
      }
    }
    mat-card-actions {
      padding: 1rem;
      display: flex;
      justify-content: flex-start;
    }
  `]
})
export class CampaignDetailComponent implements OnInit {
  campaign: Campaign | null = null;
  loading = true;
  error: string | null = null;
  donationAmount: number | null = null;
  isDonating = false;

  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private paymentService: PaymentService, // Inject PaymentService
    private snackBar: MatSnackBar,
    public keycloakService: KeycloakService // Make public for template access
  ) {}

  ngOnInit(): void {
    const campaignId = this.route.snapshot.paramMap.get('id');
    if (campaignId) {
      this.loadCampaign(campaignId);
    } else {
      this.error = 'Campaign ID not found.';
      this.loading = false;
    }
  }

  loadCampaign(id: string): void {
    this.loading = true;
    this.error = null;
    this.campaignService.getCampaignById(id).subscribe({
      next: (campaign) => {
        this.campaign = campaign;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load campaign details. Please try again later.';
        this.loading = false;
        console.error('Error loading campaign:', err);
      }
    });
  }

  get progressPercentage(): number {
    if (!this.campaign || this.campaign.targetAmount <= 0) {
      return 0;
    }
    return Math.min(100, (this.campaign.currentAmount / this.campaign.targetAmount) * 100);
  }

  makeDonation(): void {
    if (!this.donationAmount || this.donationAmount <= 0 || !this.campaign?.id) {
      this.snackBar.open('Please enter a valid donation amount.', 'Close', { duration: 3000 });
      return;
    }

    this.isDonating = true;
    const paymentDetails = {
      amount: this.donationAmount * 100, // Assuming amount is in cents
      currency: 'usd',
      campaignId: this.campaign.id,
      donorId: this.keycloakService.userId
    };

    this.paymentService.createPaymentIntent(paymentDetails).subscribe({
      next: (response: any) => { // Add explicit type 'any' or a specific interface if available
        this.isDonating = false;
        // Handle successful payment intent creation (e.g., redirect to Stripe Checkout or display payment element)
        // For now, just show success and refresh data
        this.snackBar.open('Donation processed successfully! (Simulation)', 'Close', { duration: 3000 });
        this.donationAmount = null;
        if (this.campaign?.id) {
          this.loadCampaign(this.campaign.id); // Refresh campaign data
        }
      },
      error: (error: any) => { // Add explicit type 'any' or a specific error type
        this.isDonating = false;
        this.snackBar.open('Donation failed. Please try again.', 'Close', { duration: 3000 });
        console.error('Error making donation:', error);
      }
    });
  }
}
