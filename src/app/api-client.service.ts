import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
 providedIn: 'root'
})
export class ApiClientService {
 constructor(private oktaAuth: OktaAuthService, private http: HttpClient) {
 }

 createVideo(video) {
   return this.perform('post', '/videos', video);
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

 async perform (method, resource, data = {}) {
   const accessToken = await this.oktaAuth.getAccessToken();
   const url = `http://localhost:5000${resource}`;

   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  'application/json',
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