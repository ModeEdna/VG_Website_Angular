import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;

  // This safer approach uses Angular's @HostListener decorator
  // to handle window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    // No window access in constructor or initialization
  }

  ngOnDestroy(): void {
    // No cleanup needed when using @HostListener
  }

  // Method to check screen size and close menu if needed
  checkScreenSize(): void {
    // Only access window if we're in a browser environment
    if (
      typeof window !== 'undefined' &&
      window.innerWidth > 950 &&
      this.isMobileMenuOpen
    ) {
      this.closeMenu();
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    if (this.isMobileMenuOpen) {
      // Only modify DOM if in browser environment
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
      }
    } else {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
      }
    }
  }

  closeMenu() {
    this.isMobileMenuOpen = false;

    // Only modify DOM if in browser environment
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
  }

  onOverlayClick(event: Event) {
    // Close menu only if clicking the overlay itself, not its children
    if ((event.target as HTMLElement).classList.contains('mobile-overlay')) {
      this.closeMenu();
    }
  }

  toggleDropdown(event: Event, button: HTMLElement) {
    event.stopPropagation();
    button.classList.toggle('active');
  }
}
