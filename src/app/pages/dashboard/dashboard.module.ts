// src/app/pages/dashboard/dashboard.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardRoutingModule }    from './dashboard-routing.module';
import { DashboardComponent }        from './dashboard.component';
import { MyCampaignsComponent }      from './my-campaigns.component';
import { MyBlogsComponent }          from './my-blogs.component';

// bring in your form components so the router can render them
import { CampaignFormComponent } from '../donation-campaigns/campaign-form.component';
import { BlogFormComponent }     from '../blog/blog-form.component';

@NgModule({
  declarations: [
    // nothing here since they're all standalone/imported
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,

    // these two are declared in their own modules,
    // but if they're standalone you can import them directly:
    CampaignFormComponent,
    BlogFormComponent,

    // your list components
    MyCampaignsComponent,
    MyBlogsComponent,
    DashboardComponent
  ]
})
export class DashboardModule {}
