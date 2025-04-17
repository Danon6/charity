import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="card mb-4" *ngFor="let post of blogPosts">
            <img [src]="post.imageUrl || 'assets/default-blog.jpg'" class="card-img-top" [alt]="post.title">
            <div class="card-body">
              <h2 class="card-title">{{ post.title }}</h2>
              <p class="card-text text-muted">
                By {{ post.authorName }} on {{ post.createdDate | date:'mediumDate' }}
              </p>
              <p class="card-text">{{ post.content | slice:0:200 }}...</p>
              <button class="btn btn-primary" (click)="viewPost(post.id)">
                Read More
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
      margin-bottom: 2rem;
    }
    .card:hover {
      transform: translateY(-5px);
    }
    .card-img-top {
      height: 300px;
      object-fit: cover;
    }
  `]
})
export class BlogListComponent implements OnInit {
  blogPosts: BlogPost[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.loadBlogPosts();
  }

  loadBlogPosts() {
    this.blogService.getAllPublishedPosts().subscribe(
      posts => this.blogPosts = posts,
      error => console.error('Error loading blog posts:', error)
    );
  }

  viewPost(id: string) {
    // Navigate to blog post details
  }
}
