import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ApiClientService } from "../api-client.service";

@Component({
  selector: 'video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoFormComponent implements OnInit {

  url;
  format: String;
  error: String;

  constructor(private apiClient: ApiClientService) {}

  ngOnInit() {
  }

  onSelectFile(event) {
    let file = event.target.files && event.target.files[0];

    if(file){
      let reader = new FileReader();
      reader.readAsDataURL(file);

      if(file.type.indexOf('video') > -1)
        this.format = 'video';
      else
        this.error = 'Not supported file.';

      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }
  }

  sendVideo(event) {
    this.apiClient.createVideo(this.url);
  }

}
