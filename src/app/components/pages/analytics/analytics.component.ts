import { Component } from '@angular/core';
import { ProductCardsComponent } from '../../building_blocks/product-cards/product-cards.component';

@Component({
  selector: 'app-analytics',
  imports: [ProductCardsComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent {}
