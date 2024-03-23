import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private isMenuEnabled = new Subject<boolean>();

  constructor() { }

  /**
   * Función que setea el menú izquierdo
   * @param enabled Boleano para establerce si se activa o no el menú
   */
  setMenuState(enabled: boolean) {
    this.isMenuEnabled.next(enabled);
  }

  /**
   * Función para saber en que estado se encuentra el menú izquierdo
   * @returns El estado actual del menú izquierdo
   */
  getMenuState(): Subject<boolean> {
    return this.isMenuEnabled;
  }
}
