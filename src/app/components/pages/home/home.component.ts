import { Component } from '@angular/core';
import { CarouselComponent } from '../../building_blocks/carousel/carousel.component';
import { LogoCardComponent } from '../../building_blocks/logo-card/logo-card.component';

@Component({
  selector: 'app-home',
  imports: [CarouselComponent, LogoCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
