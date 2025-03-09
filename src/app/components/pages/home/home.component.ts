import { Component } from '@angular/core';
import { CarouselComponent } from '../../building_blocks/carousel/carousel.component';

@Component({
  selector: 'app-home',
  imports: [CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
