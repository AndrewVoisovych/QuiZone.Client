import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { TokenStoreService } from './token-store.service';
import { UserService } from './user.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Token } from '../models/token';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../models/role.enum';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private currentTokenSubject: BehaviorSubject<Token>;
  public currentToken: Observable<Token>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenStore: TokenStoreService,
    private userService: UserService,
    private toast: ToastrService,
  ) {
    this.currentTokenSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('userToken')));
    
   }

   public get currentUserValue(): Token {
    return this.currentTokenSubject.value;
}

  login(email: string, password: string): Observable<Token> {
    return this.http
      .post<Token>(`${environment.urlAddress}/authentication/authenticate`, {
        email,
        password
      }, this.httpOptions)
      .pipe(
        tap(token => this.handleSuccess(token)),
        catchError(error => this.handleError(error))
      );
  }

  private handleSuccess(token: Token): void {
    this.tokenStore.setToken(token);

    this.userService.getUser(this.getId()).subscribe(data =>
      this.toast.show('Раді бачити вас!', `Вітаємо, ${data.name}`));
  }

  private handleError(httpResponse: HttpErrorResponse): Observable<any> {
    if (httpResponse.status !== 0) {
      this.toast.error('Не правильний ввід логіну й пароля', 'Помилка авторизації');
    }
    return throwError(httpResponse);
  }

  logout(): void {
    this.tokenStore.removeToken();
    this.router.navigate(['home']);
  }

  getId(): number {
    return this.tokenStore.getId();
  }

  isLoggedIn(): boolean {
    return this.tokenStore.isTokenExpired() === false;
  }

  getRole(): Role {
    return this.tokenStore.getRole();
  }

  getLogin(): string {
    return this.tokenStore.getLogin();
  }

  refreshAccessToken(): Observable<Token> {
    const currentToken = this.tokenStore.getToken();
    if (!currentToken) {
      return throwError('No token');
    }

    const { refreshToken, accessToken } = currentToken;
    return this.http
      .post<Token>(`${environment.urlAddress}/authentication/refresh_token`, {
        accessToken,
        refreshToken
      })
      .pipe(
        tap(newToken => this.handleRefreshTokenSuccess(newToken)),
        catchError(error => this.handleRefreshTokenError(error))
      );
  }

  private handleRefreshTokenSuccess(newToken: Token) {
    this.tokenStore.setToken(newToken);
  }

  private handleRefreshTokenError(error: HttpErrorResponse): Observable<never> {
    this.tokenStore.removeToken();
    return throwError(error);
  }
}
