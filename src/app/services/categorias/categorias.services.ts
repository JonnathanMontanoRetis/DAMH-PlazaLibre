import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

// Category Interface
export interface ICategory {
  id: number,
  name: string,
  image: string,
}

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Función para obtener las categorías
   * @returns Lista de categorías
   */
  async getCategories() {
    let categories: ICategory[] = [];
    try {
        this.http.get("https://mdiapiqa.gesyco.co/api/v1/catalogs/classes/getByCompany?company_id=2&recursion=childrens")
            .subscribe(async (data) => {
                const keys = Object.values(data);

                keys[3].forEach((element: any) => {
                    let cat: ICategory = {
                        id: element['id'],
                        name: element['description'],
                        image: element['image']
                      }
                    categories.push(cat);
                });
            });
      } catch (error) {
        console.log(error);
      }

      return categories;
  }
}