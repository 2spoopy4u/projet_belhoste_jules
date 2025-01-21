import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { User } from './shared/model/user';
import { Product } from './shared/model/product';
import { environment } from '../environments/environment';
import {jwtDecode} from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}
   private produitSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
   public allProducts: Observable<Product[]> = this.produitSubject.asObservable();
   private authUserSubject =new BehaviorSubject<string | undefined>(undefined);
   loginStatus$ = this.authUserSubject.asObservable();
  private refFilter:string='';
  private libelleFilter:string='';
  private priceFilter:string='';


  public loginClient(login: string, password: string): Observable<HttpResponse<User>> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      observe: 'response' as const
    };
    const data = `login=${login}&password=${password}`;    
    return this.http.post<User>(
      environment.backendLoginClient,
      data,
      httpOptions
    );
  }

  public getCalague(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.backendCatalogue);
  }
  public addUser(user : User): Observable<User>{
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = 'login=' + user.login + '&password=' + user.password+ '&mail=' + user.mail+ '&nom=' + user.nom+ '&prenom=' + user.prenom;
    return this.http.post<User>(
      environment.backendAddClient,
      data,
      httpOptions
    );
  }
  public updateUser(user : User){
    console.log("add")
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = 'login=' + user.login + '&password=' + user.password+ '&mail=' + user.mail+ '&nom=' + user.nom+ '&prenom=' + user.prenom+ '&id=' + user.id;
    return this.http.put(
      environment.backendUpdateClient,
      data,
      httpOptions
    );
  }
  public getUser(user : string){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    return this.http.get(
      environment.backendGetClient+"?id="+user,
      httpOptions
    );
  }
  public setFilter(name:string,value:string){
    this[name as 'refFilter'|'libelleFilter'|'priceFilter' ] = value;
  }
  public filter(){
    return this.getCalague().pipe(
      map((products: Product[]) =>{
      return products.filter(product =>{
        let res = true;
        res=res && (product.reference.indexOf(this.refFilter) != -1);
        res=res && product.libelle.indexOf(this.libelleFilter) > -1;
        res=res && product.prix.toString().indexOf(this.priceFilter) > -1;
  
        return res;
    });
    
    }), 
    map((filteredProduits: Product[]) => {
      this.produitSubject.next(filteredProduits);
      return filteredProduits;
    })
    )
  }
  setLoginStatus(status: string) {
    this.authUserSubject.next(status);
  }

  logout(): void {
    this.authUserSubject.next(undefined);
  }

  public decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Failed to decode token', error);
      return null;
    }
  }

 
}