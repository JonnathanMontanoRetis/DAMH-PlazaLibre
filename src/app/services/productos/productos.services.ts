import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoadingController } from "@ionic/angular";

// Product Interface
export interface IProduct {
  id: number,
  category_id: number,
  name: string,
  description: string,
  image: string,
  price: number,
  brand: string
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Función que consulta y mapea los productos según la seccion que se requiera
   * @param section Grupo de productos a consultar
   * @returns Listado los productos según el grupo de la sección solicitada
   */
  async getProductsBySection(section: string) {
    let products: IProduct[] = [];
    try {
        this.http.get("https://mdiapiqa.gesyco.co/api/v1/catalogs/presentations/" + section + "?company_id=2&recursion=mixed&recursion_level=2")
            .subscribe(async (data) => {
                const keys = Object.values(data);

                keys[3].forEach((element: any) => {
                  let images = <Array<any>>element['images']; 
                  let prices = <Array<any>>element['prices'];

                    let product: IProduct = {
                        id: element['product']['id'],
                        category_id: element['product']['category_id'],
                        name: element['product']['name'],
                        description: element['product']['description'],
                        image:images.length > 0 ? images[0] : "",
                        price: prices.length > 0 ? parseInt(prices[0]['sale_price']) : 0,
                        brand: element['product']['brand']['description']
                      }

                    products.push(product);
                });
            });   
      } catch (error) {
        console.log(error);
      }

      return products;
  }
}