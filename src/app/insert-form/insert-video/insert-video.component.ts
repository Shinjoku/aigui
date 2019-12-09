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
  private _videoIsAvailable: boolean;

  constructor(
    private videoService: InsertVideoService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
  }

  onVideoSelected(event) {
    this.file = event.target.files && event.target.files[0];
    try {

      if(this.file){
        let reader = new FileReader();
        reader.readAsDataURL(this.file);
        
        if(this.file.type.indexOf('video') > -1)
        this.format = 'video';
        else
        this.error = 'Not supported file.';
        
        reader.onload = (event) => {
          this.url = (<FileReader>event.target).result;
          this._videoIsAvailable = true;
        }
      }
    } catch(e){
      console.log(e);
    }
  }

  videoIsAvailable() {
    return this._videoIsAvailable;
  }

  openSnack(message){
    this.snackBar.open(message, 'Dismiss', {duration: 5000});
  }

  async sendVideo(event) {
    if(!this.file) {
      this.openSnack('First, you have to select a video!')
    }
    else {

      this.videoService.createVideo(this.file, this.uploadInProgress, this.uploadCompleted, this.errorOnProcessing);
    }
  }

  errorOnProcessing = (e) => {
    this.openSnack(e);
  }

  uploadInProgress = () => {
    this.openSnack("You upload has begun");
  }

  uploadCompleted = () => {
    this.openSnack('You upload has been completed!');
  }

}
