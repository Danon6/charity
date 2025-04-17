import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { Campaign } from '../../models/campaign.model';

@Component({
  selector: 'app-campaign-list',
  template: `
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-4 mb-4" *ngFor="let campaign of campaigns">
          <div class="card h-100">
            <img [src]="campaign.imageUrl || 'assets/default-campaign.jpg'" class="card-img-top" [alt]="campaign.title">
            <div class="card-body">
              <h5 class="card-title">{{ campaign.title }}</h5>
              <p class="card-text">{{ campaign.description }}</p>
              <div class="progress mb-3">
                <div class="progress-bar" role="progressbar"
                     [style.width]="(campaign.currentAmount / campaign.targetAmount * 100) + '%'">
                  {{ (campaign.currentAmount / campaign.targetAmount * 100) | number:'1.0-0' }}%
                </div>
              </div>
              <p class="card-text">
                <small class="text-muted">
                  Raised: {{ campaign.currentAmount | currency }} of {{ campaign.targetAmount | currency }}
                </small>
              </p>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary w-100" (click)="viewCampaign(campaign.id)">
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      transition: transform 0.2s;
    }
    .card:hover {
      transform: translateY(-5px);
    }
    .progress {
      height: 20px;
    }
  `]
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[] = [];

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {
    this.loadCampaigns();
  }

  loadCampaigns() {
    this.campaignService.getAllCampaigns().subscribe(
      campaigns => this.campaigns = campaigns,
      error => console.error('Error loading campaigns:', error)
    );
  }

  viewCampaign(id: string) {
    // Navigate to campaign details
  }
}
