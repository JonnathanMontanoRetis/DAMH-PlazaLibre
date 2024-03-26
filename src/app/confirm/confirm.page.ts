import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.services';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {
  constructor(
    private cartService: CartService,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    console.log("Init confirm");
  }

  /**
   * Función que invoca el renicio del carrito de compras y redirige a la pantalla de inicio
   */
  regresarInicio() {
    this.cartService.resetCart();
    this.dataService.updateCantInCart(this.cartService.hasProducts());
    this.router.navigate(['/home']);
  }

}
