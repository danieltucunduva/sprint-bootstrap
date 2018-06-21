import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  termsAndConditionsDialogNgClass = 'dialog-hide';
  dimmerNgClass = 'dimmer-hide';

  constructor() { }

  ngOnInit() {
  }

  onClickTermsAndConditions() {
    this.termsAndConditionsDialogNgClass = 'dialog-show';
    this.dimmerNgClass = 'dimmer-show';
  }

  onClickCloseTermsAndConditions() {
    this.termsAndConditionsDialogNgClass = 'dialog-hide';
    this.dimmerNgClass = 'dimmer-hide';
  }

}
