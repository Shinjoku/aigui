import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { OktaAuthService } from '@okta/okta-angular';
import { Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';


@Component({
  selector: 'app-video-info',
  templateUrl: './video-info.component.html',
  styleUrls: ['./video-info.component.scss']
})
export class VideoInfoComponent implements OnInit {

  video: any;
  baseUrl = 'http://localhost:5000/';
  picsUrl: String = this.baseUrl + "files/screenshots/";
  
  constructor(
    private route: ActivatedRoute,
    private oktaAuth: OktaAuthService,
    private router: Router,
    private apiClient: ApiClientService) {
    this.route.params.subscribe(p => {
      this.apiClient.getVideo(p.id)
      .then(v => {
        this.video = v;
      });
    })
  }

  ngOnInit() {

  }

  getImg(imgUrl){
    return this.picsUrl + imgUrl;
  }

  redirectMain(event) {
    this.router.navigate(['/home']);
  }

  async logout(event) {
    event.preventDefault();
    await this.oktaAuth.logout('/');
  }
}
