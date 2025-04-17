import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { KeycloakService } from '../../utils/keycloak/keycloak.service';

@Component({
  selector: 'app-blog-create',
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
    <div class="blog-create-container">
      <mat-card class="blog-create-card">
        <mat-card-header>
          <mat-card-title>Create New Blog Post</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="blogForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Title</mat-label>
              <input matInput formControlName="title" placeholder="Enter blog title">
              <mat-error *ngIf="blogForm.get('title')?.hasError('required')">
                Title is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Featured Image URL</mat-label>
              <input matInput formControlName="featuredImage" placeholder="Enter image URL">
            </mat-form-field>

            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Content</mat-label>
              <textarea matInput formControlName="content" rows="10" placeholder="Write your blog content here"></textarea>
              <mat-error *ngIf="blogForm.get('content')?.hasError('required')">
                Content is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Tags (comma separated)</mat-label>
              <input matInput formControlName="tags" placeholder="tag1, tag2, tag3">
            </mat-form-field>

            <div class="button-container">
              <button mat-button type="button" routerLink="/blog">Cancel</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="blogForm.invalid || isSubmitting">
                <span *ngIf="isSubmitting">
                  <mat-spinner diameter="20"></mat-spinner>
                </span>
                <span *ngIf="!isSubmitting">Publish</span>
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .blog-create-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .blog-create-card {
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
export class BlogCreateComponent implements OnInit {
  blogForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private snackBar: MatSnackBar,
    private keycloakService: KeycloakService
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      featuredImage: [''],
      content: ['', Validators.required],
      tags: ['']
    });
  }

  ngOnInit(): void {
    // Initialize form
  }

  onSubmit(): void {
    if (this.blogForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const formValue = this.blogForm.value;

    // Process tags from comma-separated string to array
    const tags = formValue.tags ? formValue.tags.split(',').map((tag: string) => tag.trim()) : [];

    const blogPost = {
      title: formValue.title,
      content: formValue.content,
      featuredImage: formValue.featuredImage || null,
      tags: tags,
      authorId: this.keycloakService.userId,
      authorName: this.keycloakService.fullName
    };

    this.blogService.createPost(blogPost).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.snackBar.open('Blog post published successfully!', 'Close', {
          duration: 3000
        });
        this.router.navigate(['/blog']);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.snackBar.open('Failed to publish blog post. Please try again.', 'Close', {
          duration: 3000
        });
        console.error('Error creating blog post:', error);
      }
    });
  }
}
