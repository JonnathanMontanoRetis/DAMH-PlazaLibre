import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../services/productos/productos.services';
import { CartService } from '../services/cart/cart.services';

const formatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  product: IProduct | undefined;
  routerPath: string | undefined;

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }  

  ngOnInit() {
    this.product = this.router.getCurrentNavigation()?.extras.queryParams?.['response'];
    this.routerPath = this.router.getCurrentNavigation()?.extras.queryParams?.['path'];
    if(this.product === undefined) {
    }
  }

  /**
   * Función para dar formato de moneda a un valor númerico
   * @param price Valor para dar formato de moneda
   * @returns Cadena de texto con el valor en pesos colombianos
   */
  formatPrice(price: number) {
    return formatter.format(price);
  }

  /**
   *Función para agregar el producto al carrito de compras
   * @param product Producto a agregar
   */
  addProductToCart(product: IProduct) {
    this.cartService.addItem(product);
  }

}
