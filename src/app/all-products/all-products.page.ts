import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { IProduct, ProductosService } from '../services/productos/productos.services';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { CartService } from '../services/cart/cart.services';
import { LoadingController } from '@ionic/angular';

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
  cartHasProdcuts: Observable<number> | undefined;

  @ViewChildren('allProducts') listProduct: QueryList<any> | undefined;

  constructor(
    private productsServices: ProductosService,
    private router: Router,
    private dataService: DataService,
    private cartService: CartService,
    private loadingCtrl: LoadingController,
  ) { }

  loading = this.loadingCtrl.create({
    spinner: 'circular'
  });

  async ngOnInit(): Promise<void> {
    (await this.loading).isOpen = true;
    this.products = await this.productsServices.getAllProducts(); //Carga de todos los productos
    this.cartHasProdcuts = this.dataService.cantProductsInCart$;
  }

  ngAfterViewInit() {
    this.listProduct?.changes.subscribe(async p => {
      (await this.loading).isOpen = false;
    })
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
