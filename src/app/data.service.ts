import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private cantProductsInCart = new BehaviorSubject<number>(0);
  cantProductsInCart$ = this.cantProductsInCart.asObservable();

  constructor() { }

  updateCantInCart(newCant: number): Observable<number> {
    this.cantProductsInCart.next(newCant);
    return this.cantProductsInCart$;
  }
}
