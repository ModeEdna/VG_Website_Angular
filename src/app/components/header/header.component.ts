import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class HeaderComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    if (this.isMobileMenuOpen) {
      // Disable scrolling on body when menu is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      // Re-enable scrolling on body when menu is closed
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
  }

  closeMenu() {
    this.isMobileMenuOpen = false;

    // Re-enable scrolling on body when menu is closed
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
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
