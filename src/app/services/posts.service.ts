import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private urlAPI = 'https://jsonplaceholder.typicode.com'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private _http: HttpClient) { }

  getAll(): Observable<any> {

    return this._http.get<any>(this.urlAPI + '/posts/')

  }

  create(post: Post): Observable<Post> {

    return this._http.post<Post>(this.urlAPI + '/posts/', JSON.stringify(post), this.httpOptions)



  }

  update(id:number, post:Post): Observable<Post> {

    return this._http.put<Post>(this.urlAPI + '/posts/' + id, JSON.stringify(post), this.httpOptions)
  }


  delete(id:number){

    return this._http.delete<any>(this.urlAPI + '/posts/' + id, this.httpOptions)

  }






}
