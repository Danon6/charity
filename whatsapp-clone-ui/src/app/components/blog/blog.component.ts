import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog',
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
    <div class="blog-container">
      <div class="blog-header">
        <h1>Our Blog</h1>
        <p>Latest updates, news, and insights</p>
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

      <div class="posts-grid" *ngIf="!loading && !error">
        <mat-card class="post-card" *ngFor="let post of posts">
          <img mat-card-image [src]="post.featuredImage" [alt]="post.title">
          <mat-card-content>
            <div class="post-meta">
              <span class="author">
                <img [src]="post.author?.avatar || 'assets/default-avatar.png'" [alt]="post.author?.name || 'Author'" class="author-avatar">
                {{ post.author?.name || 'Unknown Author' }}
              </span>
              <span class="date">{{ post.publishedAt | date:'mediumDate' }}</span>
            </div>
            <h2>{{ post.title }}</h2>
            <p>{{ post.excerpt }}</p>
            <div class="tags">
              <mat-chip-set>
                <mat-chip *ngFor="let tag of post.tags">{{ tag }}</mat-chip>
              </mat-chip-set>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary" [routerLink]="['/blog', post.id]">Read More</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .blog-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;

      .blog-header {
        text-align: center;
        margin-bottom: 3rem;

        h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #333;
        }

        p {
          font-size: 1.2rem;
          color: #666;
        }
      }

      .loading-spinner {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 300px;
      }

      .error-message {
        margin: 2rem 0;

        .error-card {
          background-color: #ffebee;
          color: #c62828;

          mat-icon {
            margin-right: 0.5rem;
            vertical-align: middle;
          }
        }
      }

      .posts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;

        .post-card {
          transition: transform 0.3s ease;

          &:hover {
            transform: translateY(-5px);
          }

          img[mat-card-image] {
            height: 200px;
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
                width: 24px;
                height: 24px;
                border-radius: 50%;
                margin-right: 0.5rem;
              }
            }
          }

          h2 {
            font-size: 1.5rem;
            margin: 1rem 0;
            color: #333;
          }

          p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 1rem;
          }

          .tags {
            margin: 1rem 0;

            mat-chip {
              margin: 0.25rem;
            }
          }

          mat-card-actions {
            padding: 1rem;
            display: flex;
            justify-content: flex-end;
          }
        }
      }
    }
  `]
})
export class BlogComponent implements OnInit {
  posts: BlogPost[] = [];
  loading = true;
  error: string | null = null;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.error = null;

    this.blogService.getAllPublishedPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load blog posts. Please try again later.';
        this.loading = false;
        console.error('Error loading posts:', err);
      }
    });
  }
}
