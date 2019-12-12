import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { ApiClientService } from '../api-client.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  selectedTab: Number;
  videos: Array<any>;
  videosWithFilter: Array<any>;
  baseUrl = 'http://localhost:5000/';
  thumbnailsUrl = this.baseUrl + 'files/thumbnails/';
  searchGroup: FormGroup;

  constructor(
    private oktaAuth: OktaAuthService,
    private apiClient: ApiClientService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.selectedTab = 0;
    this.videos = [];
    this.searchGroup = this.fb.group({
      videoName: ""
    });
  }

  async ngOnInit() {
    this.apiClient.getVideos().then((videos) => {   
      this.videos = videos;
    });
  }

  getSuspectsNumber(video) {
    if(video.result && video.result.suspects){
      return true;
    }
    else
      return false;
  }

  getThumb(videoUrl) {
    let thumbUrl = this.thumbnailsUrl + videoUrl;
    return thumbUrl;
  }

  async insert(event) {
    event.preventDefault();
    this.router.navigate(['/insert']);
  }

  async logout(event) {
    event.preventDefault();
    await this.oktaAuth.logout('/');
  }

  onSearch = (event) => {
    const target = event.target;
    if (!target.value || target.length < 3) { return; }
    if (event.which !== 13) { return; }
    console.log(target.value)
    this.videosWithFilter = this.videos.filter(v => v.title.includes(target.value))
    this.selectedTab = 1;
  }

  delete(event, video) {
    event.preventDefault();

    this.apiClient.perform('delete', '/video/' + video.id);

    let idx = this.videos.indexOf(video);
    this.videos.splice(idx, 1);
  }

  updateState(video) {
    if (this.isVideo(video)) {
      this.videos = this.videos.filter(r => r['id'] !== video.id);
    } else {
      this.videos = [video, ...this.videos];
    }
  }

  isVideo(video) {
    return this.videos.find(r => r['id'] === video.id);
  }

  updateBackend = (video) => {

  }
}