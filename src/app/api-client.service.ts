import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  constructor(
    private oktaAuth: OktaAuthService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  getVideos() {
    return this.perform('get', '/videos');
  }

  getVideo(id) {
    return this.perform('get', '/videos/' + id);
  }

  deleteVideo(id) {
    return this.perform('delete', '/videos/' + id);
  }

  async perform(method, resource, data = {}, typeMIME = "") {
    const accessToken = await this.oktaAuth.getAccessToken();
    const url = `http://localhost:5000${resource}`;
    const contentType = typeMIME === "" ? 'application/json' : typeMIME;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': contentType,
        'Authorization': `Bearer ${accessToken}`
      })
    };

    switch (method) {
      case 'delete':
        return this.http.delete(url, httpOptions).toPromise();
      case 'get':
        return this.http.get(url, httpOptions).toPromise();
      default:
        return this.http[method](url, data, httpOptions).toPromise();
    }
  }
}