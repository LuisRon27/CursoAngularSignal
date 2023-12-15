import { Component, Input, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../Interfaces/product';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  private cartService = inject(CartService);

  addProduct(product: Product){
    this.cartService.addProduct(product);
  }
}
