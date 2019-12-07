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
 ) {}

async createVideo(video) {
  let uploadForm = this.formBuilder.group({
    files: []
  });

  uploadForm.get('files').setValue(video);
  let formData = new FormData();
  formData.append('file', uploadForm.get('files').value);
  return this.http.post('http://localhost:5000/video', formData, {responseType: 'text'}).toPromise(); 
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
       'Authorization': `Bearer ${accessToken}`,
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