import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Quiz } from '../models/quiz-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class QuizService {
  apiURL = environment.urlAddress + '/quiz';


  constructor(private http: HttpClient) { }


  getQuiz(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.apiURL}/${id}`)
      .pipe(
        map((item: Quiz) =>
            new Quiz(item.id, 
              item.name, 
              item.description, 
              item.categoryId, 
              item.category, 
              item.settingId,
              item.topicId,
              item.topic,
              item.createDate,
              item.createUserId
              )
        )
      );
  }
}
