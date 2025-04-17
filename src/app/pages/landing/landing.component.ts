import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DonationCampaignsComponent } from '../donation-campaigns/donation-campaigns.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ RouterModule,CommonModule ,DonationCampaignsComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {}
