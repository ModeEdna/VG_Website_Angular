import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo-card',
  templateUrl: './logo-card.component.html',
  styleUrl: './logo-card.component.css',
  imports: [CommonModule],
})
export class LogoCardComponent implements OnInit {
  apps: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadApps();
  }

  loadApps(): void {
    this.http.get<{ apps: any[] }>('/json_files/apps.json').subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.apps = data.apps || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading apps:', err);
        this.error = 'Failed to load app data';
        this.loading = false;
        // Fallback data
        this.apps = [
          {
            id: '1',
            title: 'App A',
            hyperlink: 'https://example.com/app-a',
            logo: 'assets/app-a-logo.jpg',
          },
          {
            id: '2',
            title: 'App B',
            hyperlink: 'https://example.com/app-b',
            logo: 'assets/app-b-logo.jpg',
          },
        ];
      },
    });
  }
}
