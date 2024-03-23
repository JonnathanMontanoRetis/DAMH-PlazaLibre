import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoriasService, ICategory } from '../services/categorias/categorias.services';

import { register } from 'swiper/element/bundle';
import { ProductosService, IProduct } from '../services/productos/productos.services';
import { Router } from '@angular/router';
import { CartService } from '../services/cart/cart.services';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

register();

const formatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public categories: ICategory[] = [];
  public featuredProducts: IProduct[] = [];
  public bestSellProducts: IProduct[] = [];
  public cartHasProdcuts: Observable<number> | undefined;
  
  constructor(
    private productsServices: ProductosService,
    private cartService: CartService,
    private router: Router,
    private dataService: DataService
  ) {}

  async ngOnInit() {
    this.featuredProducts = await this.productsServices.getTopProducts(); //Carga de los productos más vendidos
    this.bestSellProducts = await this.productsServices.getRecommendedProducts(); //Carga de los productos recomendados
    this.cartHasProdcuts = this.dataService.cantProductsInCart$; //Carga de la cantidad de unidades en el carrito de compras
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
   * Función que dirige a la pantalla de ampliación de información de un producto
   * @param product Producto para ampliar información
   */
  viewDetails(product: IProduct) {
    this.router.navigate(['/item-details'], {queryParams: {response: product, path: "/home" }});
  }

  /**
   * Función que dirige al carrito de compras
   */
  goToCart() {
    this.router.navigate(['/my-cart'], {queryParams: {path: "/home" }});
  }

  /**
   * Función que agrega el producto seleccionado al carrito de compras
   * @param product Producto a agregar
   */
  addProductToCart(product: IProduct) {
    this.cartService.addItem(product);
    this.cartHasProdcuts = this.dataService.updateCantInCart(this.cartService.hasProducts());
  }
}
