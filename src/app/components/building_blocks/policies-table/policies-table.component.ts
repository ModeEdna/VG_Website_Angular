import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-policies-table',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './policies-table.component.html',
  styleUrl: './policies-table.component.css',
})
export class PoliciesTableComponent implements OnInit {
  policies: any[] = [];
  filteredPolicies: any[] = [];
  loading = true;
  error: string | null = null;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;
  paginatedPolicies: any[] = [];

  // Department filter properties
  showDepartmentDropdown: boolean = false;
  availableDepartments: string[] = [];
  selectedDepartments: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.http.get<{ policies: any[] }>('/json_files/policies.json').subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.policies = data.policies || [];
        this.filteredPolicies = [...this.policies]; // Initialize filtered policies
        this.loading = false;
        this.extractAvailableDepartments();
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error loading policies:', err);
        this.error = 'Failed to load policies data';
        this.loading = false;
        // Fallback data
        this.policies = [
          {
            name: 'Sample Policy',
            description: 'This is a sample policy description.',
            department: 'Sample Department',
            type: 'Sample Type',
          },
        ];
        this.filteredPolicies = [...this.policies];
        this.extractAvailableDepartments();
        this.updatePagination();
      },
    });
  }

  // Extract unique departments from policies
  extractAvailableDepartments(): void {
    const departmentsSet = new Set<string>();
    this.policies.forEach((policy) => {
      if (policy.department) {
        departmentsSet.add(policy.department);
      }
    });
    this.availableDepartments = Array.from(departmentsSet).sort();
    // Default to all departments selected
    this.selectedDepartments = [...this.availableDepartments];
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

  // Toggle a specific department selection
  toggleDepartment(department: string): void {
    const index = this.selectedDepartments.indexOf(department);
    if (index === -1) {
      this.selectedDepartments.push(department);
    } else {
      this.selectedDepartments.splice(index, 1);
    }
    this.applyDepartmentFilter();
  }

  // Toggle all departments selection
  toggleAllDepartments(): void {
    if (this.isAllDepartmentsSelected()) {
      this.selectedDepartments = [];
    } else {
      this.selectedDepartments = [...this.availableDepartments];
    }
    this.applyDepartmentFilter();
  }

  // Check if all departments are selected
  isAllDepartmentsSelected(): boolean {
    return this.selectedDepartments.length === this.availableDepartments.length;
  }

  // Apply department filter to policies
  applyDepartmentFilter(): void {
    if (this.selectedDepartments.length === 0) {
      this.filteredPolicies = [];
    } else if (
      this.selectedDepartments.length === this.availableDepartments.length
    ) {
      this.filteredPolicies = [...this.policies];
    } else {
      this.filteredPolicies = this.policies.filter((policy) =>
        this.selectedDepartments.includes(policy.department)
      );
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredPolicies.length / this.pageSize);
    this.paginatedPolicies = this.filteredPolicies.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }

  updatePageSize(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.pageSize = parseInt(selectElement.value, 10);
    this.currentPage = 1;
    this.updatePagination();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  sortTable(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.filteredPolicies.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
    this.updatePagination();
  }

  downloadPolicy(policy: any): void {
    console.log('Download policy:', policy);
    // Add logic to download the policy
  }

  editPolicy(policy: any): void {
    console.log('Edit policy:', policy);
    // Add logic to edit the policy
  }

  infoPolicy(policy: any): void {
    console.log('Info policy:', policy);
    // Add logic to show information about the policy
  }

  addNewPolicy(): void {
    console.log('Add new policy clicked');
    // Add logic for creating a new policy
    // This could open a modal, navigate to a new page, etc.
  }
}
