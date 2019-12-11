import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'insert-form',
  templateUrl: './insert-form.component.html',
  styleUrls: ['./insert-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InsertFormComponent implements OnInit {
  constructor(private oktaAuth: OktaAuthService, private router: Router) {}

  selectedTab: Number;

  ngOnInit() {}

  async logout(event){
    event.preventDefault();
    await this.oktaAuth.logout('/');
  }

  redirectMain(event) {
    event.preventDefault();
    this.router.navigate(['/home']);
  }
}
