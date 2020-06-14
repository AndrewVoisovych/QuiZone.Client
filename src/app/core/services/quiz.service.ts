import { Question } from './../models/question';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root'
})

export class QuizService {
  apiURL = environment.urlAddress + '/quiz';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  getAllQuiz(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiURL}`);
  }

  getQuiz(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.apiURL}/${id}`);
  }

  getQuestions(id:number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiURL}/start/${id}`);
  }

  getCountQuestions(id:number): Observable<number>{
    return this.http.get<number>(`${this.apiURL}/question/count/${id}`);
  }

  getEndHash(id:number): Observable<string>{
    return this.http.get<string>(`${this.apiURL}/end/link/${id}`);
  }
}
