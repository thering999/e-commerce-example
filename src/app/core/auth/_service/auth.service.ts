import { Injectable,  } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../_models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  // private api endpoints

  private loginUrl = "http://localhost:3000/api/user/login";
  private registerUrl = "http://localhost:3000/api/user/create";
  private verifyToken = "http://localhost:3000/api/user/verify-token";
  private updateUserUrl = "http://localhost:3000/api/user/edit";
  private resetPasswordUrl = "http://localhost:3000/api/user/reset-password";
  private newPasswordUrl = "http://localhost:3000/api/reset-password";

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email, password });
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(this.registerUrl, { name, email, password });
  }

  getUserByToken(): Observable<User> {
    const userToken = localStorage.getItem("token");
    const httpHeaders = new HttpHeaders({
      Authorization: "Bearer " + userToken,
    });
    return this.http.get<User>(this.verifyToken, { headers: httpHeaders });
  }


  updateUser(_user : User): Observable<User> {
    const userToken = localStorage.getItem("token");
    const httpHeaders = new HttpHeaders({
      Authorization: "Bearer " + userToken,
    });
    return this.http.post<User>(this.updateUserUrl, {_user}, { headers: httpHeaders })

  }

  resetPassword(email: string): Observable<any> {
    return this.http.post<any>(this.resetPasswordUrl, {email});
  }

  newPassword(password: string, userId: string, token: string): Observable<any> {
    return this.http.post<any>(this.newPasswordUrl,{password, userId, token})
  }
}

