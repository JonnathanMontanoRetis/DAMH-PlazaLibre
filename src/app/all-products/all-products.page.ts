import { Component, OnInit } from '@angular/core';
import { IProduct, ProductosService } from '../services/productos/productos.services';
import { Router } from '@angular/router';

const formatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.page.html',
  styleUrls: ['./all-products.page.scss'],
})
export class AllProductsPage implements OnInit {

  public products: IProduct[] = [];

  constructor(
    private productsServices: ProductosService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.products = await this.productsServices.getAllProducts(); //Carga de todos los productos
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
   * Función que regdirige a la pantalla de ampliación de información del producto seleccionado
   * @param product Producto para ampliar información
   */
  viewDetails(product: IProduct) {
    this.router.navigate(['/item-details'], {queryParams: {response: product, path: "/all-products" }});
  }

}
