import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-cards',
  imports: [CommonModule],
  templateUrl: './product-cards.component.html',
  styleUrl: './product-cards.component.css',
})
export class ProductCardsComponent implements OnInit {
  products: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.http.get<{ products: any[] }>('/json_files/products.json').subscribe({
      next: (data) => {
        console.log('Data recieved:', data);
        this.products = data.products || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.error = 'Failed to load products data';
        this.loading = false;
        this.products = [
          {
            id: '1',
            title: 'Finance Product',
            departments: ['Finance', 'Accounting'],
            facilities: ['PQ', 'CP'],
            description:
              'Sample description for a product. Making it longer so we see what it loks like when the text extends past a certain point of no return, as foretold by the people who came before us.',
            date: '10/23/23',
            hyperlink: 'https://www.google.com',
          },
        ];
      },
    });
  }
}
