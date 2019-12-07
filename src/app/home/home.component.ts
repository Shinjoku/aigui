import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { ApiClientService } from '../api-client.service';

@Component({
 selector: 'app-home',
 templateUrl: './home.component.html',
 styleUrls: ['./home.component.scss'],
 encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

 selectedTab: Number;
 videos: Array<any>;

 constructor(
   private oktaAuth: OktaAuthService,
   private apiClient: ApiClientService,
   private router: Router
 ) {
   this.selectedTab = 0;
   this.videos = [];
 }

 async ngOnInit() {
   this.apiClient.getVideos().then( (videos) => {
     this.videos = videos;
   } )
 }

 async newVideo(event) {
   event.preventDefault();
   this.router.navigate(['/newVideo']);
 }

 async logout(event) {
   event.preventDefault();
   await this.oktaAuth.logout('/');
 }

 onSearch = (event) => {
   const target = event.target;
   if (!target.value || target.length < 3) { return; }
   if (event.which !== 13) { return; }
 }

 onVideo(event, video) {
   event.preventDefault();
   this.updateBackend(video);
 }

 updateState(video) {
   if (this.isVideo(video)) {
     this.videos = this.videos.filter( r => r['id'] !== video.id );
   } else {
     this.videos = [video, ...this.videos];
   }
 }

 isVideo(video) {
   return this.videos.find( r => r['id'] === video.id );
 }

 updateBackend = (video) => {
   if (this.isVideo(video)) {
     this.apiClient.deleteVideo(video);
   } else {
     this.apiClient.createVideo(video);
   }
   this.updateState(video);
 }
}