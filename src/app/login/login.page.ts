import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UtilService } from '../util.service';
import { AuthService } from '../services/auth/auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  user:string = "";
  password:string = "";
  isValid:boolean = false;

  errorMessage: String = "Ingrese sus datos para iniciar sesión.";


  constructor(
    private util: UtilService,
    private navCtrl: NavController,
    private authServices: AuthService
  ) { }

  /**
   * Función que recibe y válida los campos de email y contraseña y consume el servicio de inicio de sesión
   */
  async login() {
    if(this.user === "" || this.password === "") {
      this.isValid = true;
    } else {

      await this.authServices.signIn(this.user, this.password).subscribe((response) => {
        
        const keys = Object.values(response);

        if(keys[3] !== null) {
          //Setear token en localStorage para 
          localStorage.setItem('session_token', keys[3]['session_token']);

          // Enabling Side Menu
          this.util.setMenuState(true);

          this.navCtrl.navigateRoot('/home', { animationDirection: 'forward' });
        } else {
          this.errorMessage = "Usuario o contraseña invalidos. Intente de nuevo.";
          this.isValid = true;
        }
      });
    }
  }
}
