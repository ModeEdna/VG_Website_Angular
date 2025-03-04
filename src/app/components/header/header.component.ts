import {
  Component,
  ElementRef,
  HostListener,
  QueryList,
  ViewChildren,
  AfterViewInit,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements AfterViewInit {
  isMobileMenuOpen = false;

  // Get references to dropdown buttons
  @ViewChildren('mobileDropdownButton')
  mobileDropdownButtons!: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    // Any initialization code that needs to run after the view is ready
  }

  // Toggle mobile menu when hamburger is clicked
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    // Reset all dropdowns when opening/closing the menu
    this.mobileDropdownButtons.forEach((buttonRef) => {
      const parent = buttonRef.nativeElement.parentElement;
      this.renderer.removeClass(parent, 'show');
    });

    // Prevent body scrolling when menu is active
    if (this.isMobileMenuOpen) {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    } else {
      this.renderer.setStyle(document.body, 'overflow', '');
    }
  }

  // Handle mobile dropdown toggles
  toggleDropdown(event: Event, buttonElement: HTMLElement) {
    event.preventDefault();
    event.stopPropagation();

    const parent = buttonElement.parentElement;
    const wasActive = parent?.classList.contains('show');

    // First close all dropdowns
    this.mobileDropdownButtons.forEach((ref) => {
      if (ref.nativeElement !== buttonElement) {
        const parentElement = ref.nativeElement.parentElement;
        this.renderer.removeClass(parentElement, 'show');
      }
    });

    // Then toggle this dropdown
    if (parent) {
      if (!wasActive) {
        this.renderer.addClass(parent, 'show');
      } else {
        this.renderer.removeClass(parent, 'show');
      }
    }
  }

  // Close mobile menu when clicking on a link
  closeMenu() {
    this.isMobileMenuOpen = false;
    this.renderer.setStyle(document.body, 'overflow', '');
  }

  // Close menu when clicking on overlay background (but not its children)
  onOverlayClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const overlay = target.closest('.mobile-overlay');

    if (target === overlay) {
      this.closeMenu();
    }
  }
}
