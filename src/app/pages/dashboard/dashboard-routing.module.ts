// src/app/pages/dashboard/dashboard-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { MyCampaignsComponent } from './my-campaigns.component';
import { MyBlogsComponent } from './my-blogs.component';

// point at your existing form components
import { CampaignFormComponent } from '../donation-campaigns/campaign-form.component';
import { BlogFormComponent }     from '../blog/blog-form.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      // campaigns list + form/edit
      { path: 'campaigns',          component: MyCampaignsComponent },
      { path: 'campaigns/new',      component: CampaignFormComponent },
      { path: 'campaigns/:id/edit', component: CampaignFormComponent },

      // blogs list + form/edit
      { path: 'blogs',          component: MyBlogsComponent },
      { path: 'blogs/new',      component: BlogFormComponent },
      { path: 'blogs/:id/edit', component: BlogFormComponent },

      // default to campaigns
      { path: '', redirectTo: 'campaigns', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
