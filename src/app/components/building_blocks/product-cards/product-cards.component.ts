import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-cards',
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './product-cards.component.html',
  styleUrl: './product-cards.component.css',
})
export class ProductCardsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  // Search functionality
  searchQuery: string = '';

  // Department filter
  availableDepartments: string[] = [];
  selectedDepartment: string | null = null;
  showDepartmentDropdown: boolean = false;

  // Favorites functionality
  favoriteIds: string[] = [];
  favoritesCount: number = 0;
  showOnlyFavorites: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadFavorites();
  }

  loadProducts(): void {
    this.http.get<{ products: any[] }>('/json_files/products.json').subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.products = data.products || [];
        this.filteredProducts = [...this.products];
        this.extractAvailableDepartments();
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
        this.filteredProducts = [...this.products];
        this.extractAvailableDepartments();
      },
    });
  }

  // Search and filter functions
  applyFilters(): void {
    let results = [...this.products];

    // Apply search filter
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      const query = this.searchQuery.toLowerCase().trim();
      results = results.filter(
        (product) =>
          (product.title && product.title.toLowerCase().includes(query)) ||
          (product.description &&
            product.description.toLowerCase().includes(query))
      );
    }

    // Apply department filter
    if (this.selectedDepartment) {
      results = results.filter((product) =>
        product.departments.includes(this.selectedDepartment)
      );
    }

    // Apply favorites filter
    if (this.showOnlyFavorites) {
      results = results.filter((product) =>
        this.favoriteIds.includes(product.id)
      );
    }

    this.filteredProducts = results;
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.applyFilters();
  }

  // Extract unique departments from products
  extractAvailableDepartments(): void {
    const departmentsSet = new Set<string>();
    this.products.forEach((product) => {
      if (product.departments) {
        product.departments.forEach((dept: string) => {
          departmentsSet.add(dept);
        });
      }
    });
    this.availableDepartments = Array.from(departmentsSet).sort();
  }

  // Toggle department dropdown visibility
  toggleDepartmentDropdown(event: Event): void {
    event.stopPropagation();
    this.showDepartmentDropdown = !this.showDepartmentDropdown;
  }

  // Close dropdown when clicking outside
  @HostListener('document:click')
  closeDropdown(): void {
    if (this.showDepartmentDropdown) {
      this.showDepartmentDropdown = false;
    }
  }

  // Select department
  selectDepartment(department: string | null): void {
    this.selectedDepartment = department;
    this.showDepartmentDropdown = false;
    this.applyFilters();
  }

  // Favorites functionality
  loadFavorites(): void {
    const savedFavorites = localStorage.getItem('productFavorites');
    if (savedFavorites) {
      this.favoriteIds = JSON.parse(savedFavorites);
      this.favoritesCount = this.favoriteIds.length;
    }
  }

  saveFavorites(): void {
    localStorage.setItem('productFavorites', JSON.stringify(this.favoriteIds));
    this.favoritesCount = this.favoriteIds.length;
  }

  toggleFavorite(event: Event, product: any): void {
    event.preventDefault();
    event.stopPropagation();

    const index = this.favoriteIds.indexOf(product.id);
    if (index === -1) {
      this.favoriteIds.push(product.id);
    } else {
      this.favoriteIds.splice(index, 1);
    }

    this.saveFavorites();

    // If we're only showing favorites, reapply filters when unfavoriting
    if (this.showOnlyFavorites) {
      this.applyFilters();
    }
  }

  isFavorite(product: any): boolean {
    return this.favoriteIds.includes(product.id);
  }

  toggleFavoritesFilter(): void {
    this.showOnlyFavorites = !this.showOnlyFavorites;
    this.applyFilters();
  }
}
