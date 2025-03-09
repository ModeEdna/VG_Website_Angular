import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit {
  announcements: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements() {
    this.http
      .get<{ announcements: any[] }>('/json_files/announcements.json')
      .subscribe({
        next: (data) => {
          console.log('Loaded announcements:', data);
          this.announcements = data.announcements || [];
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading announcements:', err);
          this.error = 'Failed to load announcements data';
          this.loading = false;
          // Fallback data in case of error
          this.announcements = [
            {
              id: '1',
              title: 'Default Announcement',
              hyperlink: 'https://www.google.com',
              image: '../VG_IPO.jpeg',
              announcement: 'This is a default announcement.',
            },
          ];
        },
      });
  }
}
