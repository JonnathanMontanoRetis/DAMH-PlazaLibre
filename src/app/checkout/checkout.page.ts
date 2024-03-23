import { Component, OnInit } from '@angular/core';
import { CartService, ICart } from '../services/cart/cart.services';
import { AlertController, LoadingController } from '@ionic/angular';
import { PaymentService } from '../services/payment/payment.services';
import { Router } from '@angular/router';

const formatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  productsInCart: ICart[] = [];
  subTotal:number | undefined;
  total: number | undefined;

  metodoPago = "";

  constructor(
    private cartService: CartService,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private paymentServices: PaymentService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productsInCart = this.cartService.getProductsInCart(); //Carga de los productos que estan en el carrito de compras
    this.subTotal = this.cartService.calculateTotal(); //Invoca el calculo del valor total a pagar
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
   * Función que calcula el subtotal y agrega los costos de envio
   * @returns Valor total de la compra con formato de moneda
   */
  obtenerTotal() {
    this.total = (this.subTotal! + 5000);
    return this.formatPrice(this.total);
  }

  /**
   * Función encargada de solicitar el metodo de pago e invocar el proceso de pago
   */
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'MEDIO DE PAGO',      
      inputs: [
        {
          type: 'radio',
          label : 'Tarjeta',
          value : 'tarjeta',
          checked : false,
        },
        {
          type: 'radio',
          label : 'Teléfono',
          value : 'telefono',
        },
        {
          type: 'radio',
          label : 'Efectivo',
          value : 'efectivo',
        }
      ],
      buttons: [
        {
          text: 'Continuar',
          handler: async (data) => {
            this.metodoPago = data;
            console.log(this.metodoPago);
            if(data === undefined) {
              const notification = await this.alertController.create({
                header: 'Por favor seleccione el medio de pago',
                buttons: [
                  {
                    text: 'Aceptar',
                    handler: () => {
                      this.presentAlert();
                    }
                  }
                ]
              });
              notification.present();
            } else {
              await this.paymentServices.sendPayment(this.metodoPago, this.total!).subscribe((response) => {
                const keys = Object.values(response);
                this.loadingPayment(keys[1]);
              });
            }
          } 
        },
        {
          text: 'Cancelar'
        }
      ],
    });
    
    await alert.present();
  }

  /**
   * Función que presenta una animación de carga mientras se realiza el proceso de pago
   * @param response Animación de carga
   */
  async loadingPayment(response: string) {
    const loading = this.loadingCtrl.create({
      spinner: 'circular'
    });
    (await loading).isOpen = true;

    window.setTimeout(async () => {
      console.log('Finish');

      (await (loading)).isOpen = false;

      if(response === 'Transaction is successful.') {
        this.router.navigate(['/confirm']);
      }
    }, 2000);
  }
}
