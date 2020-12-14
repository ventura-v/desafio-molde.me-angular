import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from 'src/model/product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `${localStorage.getItem('token')}` })
};

const apiUrl = 'http://localhost:3001/products';
// const apiUrl = 'https://recrutamento.molde.me/fabric';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://recrutamento.molde.me/fabric')
      .pipe(
        tap(products => console.log('leu os produtos')),
        catchError(this.handleError('getProdutos', []))
      );
  }

  getProduct(id: number): Observable<Product> {
    const url = `https://recrutamento.molde.me/fabric/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => console.log(`leu o produto id=${id}`)),
      catchError(this.handleError<Product>(`getProduto id=${id}`))
    );
  }

  // read(): Observable<Product[]> {
  //   return this.http.get<Product[]>(apiUrl).pipe(map(obj => obj),
  //     // catchError(e => this.handleError(e))
  //   )
  // }

  // readById(id: number): Observable<Product> {
  //   const url = `${apiUrl}/${id}`
  //   return this.http.get<Product>(url).pipe(map(obj => obj),
  //     // catchError(e => this.handleError(e))
  //   )
  // }

  addProduct(product): Observable<Product> {
    return this.http.post<Product>('https://recrutamento.molde.me/fabric', product, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((produto: Product) => console.log(`adicionou o produto com w/ id=${product._id}`)),
      catchError(this.handleError<Product>('addProduto'))
    );
  }

  updateProduct(id, product): Observable<any> {
    const url = `https://recrutamento.molde.me/fabric/${id}`;
    return this.http.put(url, product, httpOptions).pipe(
      tap(_ => console.log(`atualiza o produco com id=${id}`)),
      catchError(this.handleError<any>('updateProduto'))
    );
  }

  deleteProduct(id): Observable<Product> {
    // const url = `${apiUrl}/delete/${id}`;
    const url = `https://recrutamento.molde.me/fabric/${id}`;

    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o produto com id=${id}`)),
      catchError(this.handleError<Product>('deleteProduto'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
