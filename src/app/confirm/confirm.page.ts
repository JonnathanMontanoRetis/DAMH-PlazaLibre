import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {
  cartService: any;
  router: any;

  constructor() { }

  ngOnInit() {
    console.log("Init confirm");
  }

  /**
   * Función que invoca el renicio del carrito de compras y redirige a la pantalla de inicio
   */
  regresarInicio() {
    this.cartService.resetCart();
    this.router.navigate(['/home']);
  }

}
