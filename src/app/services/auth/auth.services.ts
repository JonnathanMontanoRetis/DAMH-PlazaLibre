import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Función para realizar el login de un usuario.
   * @param user Correo electronico del usuario
   * @param pass Contraseña del usuario
   * @returns Promesa de consumo de la petición 
   */
  signIn(user: String, pass: string) {
    return  this.http.get('https://mdiapiqa.gesyco.co/api/v1/system/customers/getForMDILoginCustomer?company_id=2&email='+user+'&password='+pass);
  }
}