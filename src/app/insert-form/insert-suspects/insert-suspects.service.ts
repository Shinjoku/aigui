import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
 providedIn: 'root'
})
export class InsertSuspectsService {
 constructor(
   private oktaAuth: OktaAuthService, 
   private http: HttpClient,
   private formBuilder: FormBuilder
 ) {}

 images = [];

async createSuspect(suspect) {
  let user = await this.oktaAuth.getUser();
  let accessToken = await this.oktaAuth.getAccessToken();
  let url = 'http://localhost:5000/suspect';
  let formData = new FormData();

  suspect.images.forEach(img => {
    formData.append('files', img);
  });

  formData.append('suspectName', suspect.name);
  formData.append('user', user.name);
  
  let options = {
    reportProgress: true,
    params: new HttpParams(),
    init: {
      responseType: "text"
    }
  };

  console.log(formData);
  let req = new HttpRequest(
    'POST',
    url,
    formData,
    options
  );

  return this.http.request(req).toPromise(); 
}

 deleteVideo(video) {
   return this.perform('delete', `/video/${video.id}`);
 }

 updateVideo(video) {
   return this.perform('put', `/video/${video.id}`, video);
 }

 getVideos() {
   return this.perform('get', '/videos');
 }

 getVideo(video) {
   return this.perform('get', `/video/${video.id}`);
 }

 async perform (method, resource, data = {}, typeMIME="") {
   const accessToken = await this.oktaAuth.getAccessToken();
   const url = `http://localhost:5000${resource}`;
   const contentType = typeMIME === "" ? 'application/json' : typeMIME;

   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  contentType,
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