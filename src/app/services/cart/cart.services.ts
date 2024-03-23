import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../productos/productos.services';

// Cart Interface
export interface ICart {
  product: IProduct,
  cant: number
}
  

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: ICart[] = [];

  constructor() {}

  /**
   * Función para agregar un producto al carrito de compras o aumentar su cantidad si ya se encuentra a gregado
   * @param product Producto a agregar al carrito de compras
   */
  addItem(product: IProduct) {
    const isExist = this.cart.find((val: ICart) => val.product.id === product.id);

    if(!isExist) {
        let itemCart: ICart = {
            product: product,
            cant: 1
        }

        this.cart.push(itemCart);
    } else {
        this.cart.find((val: ICart) => val.product.id === product.id)!.cant += 1;
    }
 }

 /**
  * Función para disminuir la cantidad en el carrito de compras
  * @param product Producto que se encuentra en el carrito para disminuir su cantidad
  */
 reduceItem(product: IProduct) {
    if(this.cart.find((val: ICart) => val.product.id === product.id)!.cant > 1)
      this.cart.find((val: ICart) => val.product.id === product.id)!.cant -= 1;
 }

 /**
  * Funcuón para eliminar un producto del carrito de compras
  * @param product Producto a eliminar del carrito de compras
  */
 removeItem(product: IProduct) {
  this.cart.forEach( (item, index) => {
    if(item.product === product) this.cart.splice(index,1);
  });
}

/**
 * Función para obtener todos los productos agregados al carrito de compras
 * @returns Lista de productos agregados al carrito de compras
 */
 getProductsInCart() {
    return [...this.cart];
 }

 /**
  * Función para obtener todas las cantidades de todos los productos agregados al carrito de compras
  * @returns Número de cantidades totales
  */
 hasProducts(): number {
  if(this.cart.length > 0) {
      let sum: number = this.cart.map(a => a.cant).reduce(function(a, b)
      {
        return a + b;
      });
      console.log(sum);

      return sum;
    } else {
      return 0;
    }
  }

  /**
   * Función para calcular y retornar el valor del total a pagar
   * @returns Valor del total
   */
  calculateTotal() {
    let total = 0;
    this.cart.map( item => {
      total += (item.product.price * item.cant);
    });

    return total;
  }
  
  /**
   * Función para reiniciar el carrito de compras despues de una compra realizada exitosamente
   */
  resetCart() {
    this.cart = [];
  }

}
