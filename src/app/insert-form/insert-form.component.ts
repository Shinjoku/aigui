import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { InsertVideoService } from "./insert-video/insert-video.service";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'insert-form',
  templateUrl: './insert-form.component.html',
  styleUrls: ['./insert-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InsertFormComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
