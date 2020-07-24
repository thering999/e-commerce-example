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
  private verifyToken = "http://localhost:3000/api/user/verify-token";


  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email, password });
  }



  getUserByToken(): Observable<User> {
    const userToken = localStorage.getItem("token");
    const httpHeaders = new HttpHeaders({
      Authorization: "Bearer " + userToken,
    });
    return this.http.get<User>(this.verifyToken, { headers: httpHeaders });
  }

}

