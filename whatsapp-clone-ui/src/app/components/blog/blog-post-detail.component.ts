import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-blog-post-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  template: `
    <div class="blog-post-container" *ngIf="!loading && !error">
      <mat-card class="blog-post-card">
        <img mat-card-image [src]="post?.featuredImage" [alt]="post?.title">
        <mat-card-content>
          <div class="post-meta">
            <span class="author">
              <img [src]="post?.author?.avatar || 'assets/default-avatar.png'" [alt]="post?.author?.name || 'Author'" class="author-avatar">
              {{ post?.author?.name || 'Unknown Author' }}
            </span>
            <span class="date">{{ post?.publishedAt | date:'mediumDate' }}</span>
          </div>
          <h1>{{ post?.title }}</h1>
          <div class="content" [innerHTML]="post?.content"></div>
          <div class="tags">
            <mat-chip-set>
              <mat-chip *ngFor="let tag of post?.tags">{{ tag }}</mat-chip>
            </mat-chip-set>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button color="primary" routerLink="/blog">
            <mat-icon>arrow_back</mat-icon>
            Back to Blog
          </button>
        </mat-card-actions>
      </mat-card>
    </div>

    <div class="loading-spinner" *ngIf="loading">
      <mat-spinner></mat-spinner>
    </div>

    <div class="error-message" *ngIf="error">
      <mat-card class="error-card">
        <mat-card-content>
          <mat-icon>error_outline</mat-icon>
          <p>{{ error }}</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .blog-post-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .blog-post-card {
      margin-bottom: 2rem;
    }

    img[mat-card-image] {
      height: 400px;
      object-fit: cover;
    }

    .post-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      font-size: 0.9rem;
      color: #666;

      .author {
        display: flex;
        align-items: center;

        .author-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin-right: 0.5rem;
        }
      }
    }

    h1 {
      font-size: 2.5rem;
      margin: 1rem 0;
      color: #333;
    }

    .content {
      color: #444;
      line-height: 1.8;
      margin: 2rem 0;
    }

    .tags {
      margin: 2rem 0;

      mat-chip {
        margin: 0.25rem;
      }
    }

    .loading-spinner {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
    }

    .error-message {
      margin: 2rem auto;
      max-width: 800px;

      .error-card {
        background-color: #ffebee;
        color: #c62828;

        mat-icon {
          margin-right: 0.5rem;
          vertical-align: middle;
        }
      }
    }
  `]
})
export class BlogPostDetailComponent implements OnInit {
  post: BlogPost | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.loadPost(postId);
    }
  }

  loadPost(id: string): void {
    this.loading = true;
    this.error = null;

    this.blogService.getPostById(id).subscribe({
      next: (post) => {
        this.post = post;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load blog post. Please try again later.';
        this.loading = false;
        console.error('Error loading post:', err);
      }
    });
  }
}
