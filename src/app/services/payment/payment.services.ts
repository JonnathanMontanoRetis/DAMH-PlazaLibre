import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Función para consumir el servicio de la pasarela de pago
   * @param method Parámetro que recibe alguno de los metodos de pago disponibles (Efectivo, Tarjeta, Teléfono)
   * @param amount Parámetro que recibe el monto a pagar.
   * @returns 
   */
  sendPayment(method: string, amount: number) {
    let baseURl = "";
    let body = '';
    switch (method) {
        case "tarjeta":
            baseURl = "https://1f26-181-48-123-206.ngrok-free.app/api/v1/payment/card";
            body = '{"app_name": "ABC","service": "Electronic Items","customer_email":"shalithax@gmail.com","card_type  ": "VISA","card_holder_name": "Example","card_number": "4242424242424242","expiryMonth": "01","expiryYear": "2020","cvv": "123","amount": "' + amount + '.00","currency": "USD"}';
            break;
        case "telefono":
        case "efectivo":
            baseURl = "https://1f26-181-48-123-206.ngrok-free.app/api/v1/payment/phone";
            body = '{"app_name": "ABC","service": "Electronic Items","customer_email":"shalithax@gmail.com","phone_number  ": "0771940055","phone_holder_name": "shalitha","amount": "' + amount + '.00","currency": "USD"}';
            break;
    }
    
    return this.http.post(baseURl, body, {
        headers: { "Content-Type": "application/json" }
    });
  }
}