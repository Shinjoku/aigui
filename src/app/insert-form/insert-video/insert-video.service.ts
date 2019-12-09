import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType, HttpRequest } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InsertVideoService {
  constructor(
    private oktaAuth: OktaAuthService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  async createVideo(video, progressCallback, successCallback, errorCallback) {
    let uploadForm = this.formBuilder.group({
      files: []
    });
    let url = 'http://localhost:5000/video';
    let user = await this.oktaAuth.getUser();
    let accessToken = await this.oktaAuth.getAccessToken();

    let options = {
      reportProgress: true,
      params: new HttpParams(),
    };

    uploadForm.get('files').setValue(video);
    let formData = new FormData();
    formData.append('file', uploadForm.get('files').value);
    formData.append('user', user.email);

    let req = new HttpRequest(
      'POST',
      url,
      formData,
      options
    );

    req = req.clone({
      setHeaders: {
          // 'Content-Type': "multipart/form-data",
          'Authorization': `Bearer ${accessToken}`
      }
    })

    let res = 0;
    return this.http.request(req).subscribe(event => {
      if (event.type === HttpEventType.DownloadProgress) {
        if(res === 0){
          console.log("download progress");
          progressCallback();
        }
      }
      if (event.type === HttpEventType.Response) {
        console.log("donwload completed");
        successCallback();
      }
    },
    err => errorCallback(err.message));
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