import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  termsAndConditionsDialogNgClass = 'dialog-hide';
  dimmerNgClass = 'dimmer-hide';
  termsAndConditionsDialogExists = false;

  constructor() { }

  ngOnInit() {
  }

  onClickTermsAndConditions() {
    this.termsAndConditionsDialogExists = true;
    this.termsAndConditionsDialogNgClass = 'dialog-show';
    this.dimmerNgClass = 'dimmer-show';
  }

  onClickCloseTermsAndConditions() {
    this.termsAndConditionsDialogExists = false;
    this.termsAndConditionsDialogNgClass = 'dialog-hide';
    this.dimmerNgClass = 'dimmer-hide';
  }

}
