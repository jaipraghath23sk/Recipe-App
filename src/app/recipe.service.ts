import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  apiUrl='https://api.edamam.com/search?q=pizza&app_id=a5de3521&app_key=28f8a20bd893e2740e68d4bbb349b977&from=0&to=50'

  constructor(private http:HttpClient) { }

  getRecipeItems(): Observable<any>{

    return this.http.get<any>(this.apiUrl);
    
  }
}
