import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'table-of-contents',
  styleUrls: ['./table-of-contents.component.scss'],
  templateUrl: './table-of-contents.component.html'
})
export class TableOfContents implements OnInit {
  @Input() items: String;
  @Input() baseUrl: String;
  @Input() header: String;

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.items);
  }

  getImg(imgUrl) {
    return this.baseUrl + imgUrl;
  }

}
