import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { InsertVideoService } from "./insert-video.service";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'insert-video',
  templateUrl: './insert-video.component.html',
  styleUrls: ['./insert-video.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InsertVideoComponent implements OnInit {

  url;
  format: String;
  error: String;
  file: File;
  message: String;

  constructor(
    private videoService: InsertVideoService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
  }

  onVideoSelected(event) {
    this.file = event.target.files && event.target.files[0];

    if(this.file){
      let reader = new FileReader();
      reader.readAsDataURL(this.file);

      if(this.file.type.indexOf('video') > -1)
        this.format = 'video';
      else
        this.error = 'Not supported file.';

      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }
  }

  openSnack(message){
    this.snackBar.open(message, 'Dismiss', {duration: 5000});
  }

  async sendVideo(event) {
    if(!this.file) {
      this.openSnack('First, you have to select a video!')
    }
    else {

      this.videoService.createVideo(this.file)
        .then(res => this.openSnack('Video uploaded successfully.'))
        .catch(err => this.openSnack('Error: ' + err.message));
    }
  }

}
