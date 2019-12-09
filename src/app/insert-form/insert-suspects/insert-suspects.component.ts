import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { InsertSuspectsService } from "./insert-suspects.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'insert-suspects',
  templateUrl: './insert-suspects.component.html',
  styleUrls: ['./insert-suspects.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InsertSuspectsComponent implements OnInit {

  url;
  format: String;
  error: String;
  message: String;
  suspects;
  suspectsForm: FormGroup;

  newSuspect = {
    name: "",
    images: [],
    imagesVisualization: []
  };

  constructor(
    private suspectsService: InsertSuspectsService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.suspectsForm = this.fb.group({
      newSuspectName: ""
    });

    this.suspects = [];
  }

  ngOnInit() {}

  onImageSelected(event, suspect=null) {
    
    let img = event.target.files && event.target.files[0];
    
    if(img) {
      
      let reader = new FileReader();
      reader.readAsDataURL(img);

      if(img.type.indexOf('image') > -1)
          this.openSnack('Image included successfully.');
      else
          this.openSnack('Not supported file.');
      
      reader.onload = (event) => {
        if(!!suspect){
          suspect.images.push(img);
          suspect.imagesVisualization.push((<FileReader>event.target).result);
        }
        else{
          this.newSuspect.images.push(img);
          this.newSuspect.imagesVisualization.push((<FileReader>event.target).result);
        }
      }
    }
  }

  openSnack(message){
    this.snackBar.open(message, 'Dismiss', {duration: 5000});
  }

  async sendSuspects(event) {
    if(this.suspects.length === 0) {
      this.openSnack('You should add at least one suspect before pressing the send button!')
    }
    else {
      console.log('NUMBER OF SUSPECTS', this.suspects.length);
      this.suspects.forEach(suspect => {
        console.log(suspect)
        this.suspectsService.createSuspect(suspect)
        .then(res => {
          console.log(res);
          this.openSnack('Suspects uploaded successfully.')
        })
        .catch(err => this.openSnack('Error: ' + err.message));
      });
    }
  }

  async addSuspect(event) {
    this.newSuspect['name'] = this.suspectsForm.value['newSuspectName'];
    this.suspects.push(this.newSuspect);

    this.newSuspect = {
      name: "",
      images: [],
      imagesVisualization: []
    };

    this.suspectsForm = this.fb.group({
      newSuspectName: ""
    });
  }

  async removeSuspect(event, suspect) {
    this.suspects.splice(this.suspects.indexOf(suspect), 1);
  }
}
