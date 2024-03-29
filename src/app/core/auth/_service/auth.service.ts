import { Injectable,  } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../_models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  // private api endpoints

  private loginUrl = "https://janasoft-store-api.herokuapp.com/login";
  private verifyToken = "https://janasoft-store-api.herokuapp.com/users/me";


  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email, password });
  }



  getUserByToken(): Observable<User> {
    const userToken = localStorage.getItem("token");
    const httpHeaders = new HttpHeaders({
      Authorization: userToken,
    });
    return this.http.get<User>(this.verifyToken, { headers: httpHeaders });
  }

}

