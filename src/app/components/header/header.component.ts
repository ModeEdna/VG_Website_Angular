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
  }

  closeMenu() {
    this.isMobileMenuOpen = false;
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
