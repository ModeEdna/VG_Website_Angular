import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-card',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './admin-card.component.html',
  styleUrl: './admin-card.component.css',
})
export class AdminCardComponent implements OnInit {
  adminCards: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAdminCards();
  }

  loadAdminCards(): void {
    this.http
      .get<{ adminCards: any[] }>('/json_files/admin-cards.json')
      .subscribe({
        next: (data) => {
          console.log('Data received:', data);
          this.adminCards = data.adminCards || [];
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading admin cards:', err);
          this.error = 'Failed to load admin cards';
          this.loading = false;
          // Fallback data
          this.adminCards = [
            {
              id: '1',
              title: 'Loading did not work',
              icon: '/powerBi.svg',
              description: 'Failed to load',
              hyperlink: 'https://www.google.com',
            },
          ];
        },
      });
  }
}
