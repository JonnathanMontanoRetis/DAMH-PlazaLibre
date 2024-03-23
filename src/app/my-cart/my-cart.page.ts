import { Component, OnInit } from '@angular/core';
import { CartService, ICart } from '../services/cart/cart.services';
import { Router } from '@angular/router';
import { IProduct } from '../services/productos/productos.services';
import { DataService } from '../data.service';

const formatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.page.html',
  styleUrls: ['./my-cart.page.scss'],
})
export class MyCartPage implements OnInit {

  productsInCart: ICart[] = [];
  routerPath: string | undefined;

  constructor(
    private cartService: CartService,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.routerPath = this.router.getCurrentNavigation()?.extras.queryParams?.['path'];
    /**
     * Carga inicial de todos los productos agregados al carrito de compras
     */
    this.productsInCart = this.cartService.getProductsInCart();
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
   * Función para agregar el producto seleccionado al carrito de compras
   * @param product Producto a agregar
   */
  addCantProduct(product: IProduct) {
    this.cartService.addItem(product);
    this.updateCantInCart();
  }

  /**
   * Función para reducir la cantidad en el carrito de compras
   * @param product Producto a reducir cantidad
   */
  removeCatnProduct(product: IProduct) {
    this.cartService.reduceItem(product);
    this.updateCantInCart();
  }

  /**
   * Función para remover el producto seleccionado del carrito de compras
   * @param product Producto a remover
   */
  removeProductInCart(product: IProduct) {
    this.cartService.removeItem(product);
    this.updateCantInCart();
    this.productsInCart = this.cartService.getProductsInCart();
  }

  /**
   * Función para intercambiar la cantidad de los productos entre componentes
   */
  updateCantInCart() {
    this.dataService.updateCantInCart(this.cartService.hasProducts());
  }

}
