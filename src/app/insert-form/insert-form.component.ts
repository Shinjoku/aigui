import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ApiClientService } from "../api-client.service";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'insert-form',
  templateUrl: './insert-form.component.html',
  styleUrls: ['./insert-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InsertFormComponent implements OnInit {

  url;
  format: String;
  error: String;
  file: File;
  message: String;

  constructor(
    private apiClient: ApiClientService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
  }

  onSelectFile(event) {
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

      this.apiClient.createVideo(this.file)
        .then(res => this.openSnack('Video uploaded successfully.'))
        .catch(err => this.openSnack('Error: ' + err.message));
    }
  }

}
