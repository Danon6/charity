import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CampaignService } from '../../services/campaign.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { KeycloakService } from '../../utils/keycloak/keycloak.service';

@Component({
  selector: 'app-campaign-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="campaign-create-container">
      <mat-card class="campaign-create-card">
        <mat-card-header>
          <mat-card-title>Create New Campaign</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="campaignForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Title</mat-label>
              <input matInput formControlName="title" placeholder="Enter campaign title">
              <mat-error *ngIf="campaignForm.get('title')?.hasError('required')">
                Title is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Description</mat-label>
              <textarea matInput formControlName="description" rows="5" placeholder="Describe your campaign"></textarea>
              <mat-error *ngIf="campaignForm.get('description')?.hasError('required')">
                Description is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Target Amount</mat-label>
              <input matInput type="number" formControlName="targetAmount" placeholder="Enter target amount">
              <mat-error *ngIf="campaignForm.get('targetAmount')?.hasError('required')">
                Target amount is required
              </mat-error>
              <mat-error *ngIf="campaignForm.get('targetAmount')?.hasError('min')">
                Target amount must be positive
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Image URL</mat-label>
              <input matInput formControlName="imageUrl" placeholder="Enter image URL">
            </mat-form-field>

            <div class="button-container">
              <button mat-button type="button" routerLink="/campaigns">Cancel</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="campaignForm.invalid || isSubmitting">
                <span *ngIf="isSubmitting">
                  <mat-spinner diameter="20"></mat-spinner>
                </span>
                <span *ngIf="!isSubmitting">Create Campaign</span>
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .campaign-create-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .campaign-create-card {
      padding: 1rem;
    }

    .full-width {
      width: 100%;
      margin-bottom: 1rem;
    }

    .button-container {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1rem;
    }
  `]
})
export class CampaignCreateComponent implements OnInit {
  campaignForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private campaignService: CampaignService,
    private router: Router,
    private snackBar: MatSnackBar,
    private keycloakService: KeycloakService
  ) {
    this.campaignForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      targetAmount: ['', [Validators.required, Validators.min(1)]],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    // Initialize form
  }

  onSubmit(): void {
    if (this.campaignForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const formValue = this.campaignForm.value;

    const campaign = {
      title: formValue.title,
      description: formValue.description,
      targetAmount: formValue.targetAmount,
      imageUrl: formValue.imageUrl || null,
      creatorId: this.keycloakService.userId
    };

    this.campaignService.createCampaign(campaign).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.snackBar.open('Campaign created successfully!', 'Close', {
          duration: 3000
        });
        this.router.navigate(['/campaigns']);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.snackBar.open('Failed to create campaign. Please try again.', 'Close', {
          duration: 3000
        });
        console.error('Error creating campaign:', error);
      }
    });
  }
}
