import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogPostDetailComponent } from './components/blog/blog-post-detail.component';
import { BlogListComponent } from './components/blog/blog-list.component';
import { CampaignListComponent } from './components/campaign/campaign-list.component';
import { inject } from '@angular/core';
import { KeycloakService } from './utils/keycloak/keycloak.service';

// Auth guard function
const authGuard = () => {
  const keycloakService = inject(KeycloakService);
  return keycloakService.isTokenValid ? true : { path: '/login' };
};

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'chat',
    component: MainComponent,
    canActivate: [authGuard]
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'blog/:id',
    component: BlogPostDetailComponent
  },
  {
    path: 'blog/create',
    component: BlogCreateComponent,
    canActivate: [authGuard]
  },
  {
    path: 'campaigns',
    component: CampaignListComponent
  },
  {
    path: 'campaigns/create',
    component: CampaignCreateComponent,
    canActivate: [authGuard]
  },
  {
    path: 'campaigns/:id',
    component: CampaignDetailComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
