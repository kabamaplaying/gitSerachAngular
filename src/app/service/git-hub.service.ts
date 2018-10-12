import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GitHubService {

  private username = 'your_user';
  private client_id = 'your_client_id';
  private client_secret = 'you_client_secret';

  private access: string;
  constructor(private _http: HttpClient) {
    this.access = '?client_id=' + this.client_id + '&client_secret=' + this.client_secret;
   }
   getUser() {
     return this._http.get('https://api.github.com/users/' + this.username + this.access);
   }
   /**
    * Busqueda de repositorios de usuarios
    */
   getRepositories(username: string): Observable<any[]> {
    return this._http.get<any[]>('https://api.github.com/users/' + username + '/repos');
  }
     /**
    * Busqueda  de usuarios
    */
  findUser(uname: string): Observable<any> {
    return this._http.get('https://api.github.com/users/' + uname );
  }
}
