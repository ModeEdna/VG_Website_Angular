import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-learn-card',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './learn-card.component.html',
  styleUrl: './learn-card.component.css',
})
export class LearnCardComponent implements OnInit {
  resources: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  selectedContent: 'bio' | 'contact' | 'skills' = 'bio';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.http
      .get<{ resources: any[] }>('/json_files/learn-resources.json')
      .subscribe({
        next: (data) => {
          console.log('Data received:', data);
          this.resources = data.resources || [];
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading learning resources:', err);
          this.error = 'Failed to load learning resource data';
          this.loading = false;
          // Fallback data
          this.resources = [
            {
              id: '1',
              name: 'VG University',
              link: 'https://www.google.com',
              image: '../powerBi.svg',
              description:
                'You can find your VG required courses at VG University.',
            },
          ];
        },
      });
  }
}
