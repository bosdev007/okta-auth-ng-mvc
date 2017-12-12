import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { OAuthService } from 'angular-oauth2-oidc';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public values: string[] = ["Eat", "at", "Fred's"];
  public errorMessage: string = null;

  constructor(private oauthService: OAuthService, private http: HttpClient) { }

  ngOnInit() {
    this.getValues().subscribe((v) => {
      this.values.push(v);
    },
    (err) => { this.errorMessage = err.message; });
  }

  get isValidLogin(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  getValues(): Observable<string> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json');

    // return observable
    let webObservable = this.http.get('/api/values', { headers: headers });
    debugger;

    return webObservable.flatMap((x: string) => x);
  }
}
