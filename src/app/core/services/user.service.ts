import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  apiURl = environment.urlAddress + '/user';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }


  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiURl}/${id}`);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiURl}/email/${email}`);
  }

  insertUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiURl}/`, user, this.httpOptions);
  }

  confirmEmail(email: string, hash: string): Observable<string> {
    return this.http.put(`${this.apiURl}/confirm/${email}/${hash}`, this.httpOptions, { responseType: 'text' });
  }
}
