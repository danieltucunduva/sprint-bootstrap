import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SprintService } from './sprint.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { MatDialog } from '@angular/material';
import { SprintFinishedDialogComponent } from './ongoing-sprint/sprint-finished-dialog/sprint-finished-dialog.component';
import { DeleteDataDialogComponent } from './past-sprints/delete-data-dialog/delete-data-dialog.component';
import { trigger, style, query, group, state, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-sprint',
  animations: [
    trigger('flyInOutTabs', [
      state('new', style({ transform: 'translateX(0)' })),
      state('past', style({ transform: 'translateX(100)' })),
    ])
  ],
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {
  ongoingSprint = false;
  sprintSubscription: Subscription;
  tabIndex = 0;
  pastSprintsSubscription: Subscription;
  availableSprintsSubscription: Subscription;
  flyInOutTabs = 'past';

  constructor(
    private sprintService: SprintService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.sprintSubscription = this.sprintService.sprintChanged.subscribe(sprint => {
      if (sprint) {
        this.ongoingSprint = true;
      } else {
        this.ongoingSprint = false;
      }
    });
    this.pastSprintsSubscription = this.sprintService.pastSprintsChanged.subscribe(sprint => {
      if (sprint) {
        this.tabIndex = 0;
      } else {
        this.tabIndex = 1;
      }
    });
    this.availableSprintsSubscription = this.sprintService.availableSprintsChanged.subscribe(changed => {
      if (changed) {
        this.tabIndex = 1;
      }
    });
  }

  sprintStop() {
    this.ongoingSprint = false;
  }

  onClickDeleteData() {
    const dialogRef = this.dialog.open(DeleteDataDialogComponent, { data: { type: 'delete-user' } });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.authenticationService.deleteLoggedUser();
      }
    });
  }

  onClickPastSprintsTabHeader() {
    this.tabIndex = 0;
    this.flyInOutTabs = 'past';
  }

  onClickNewSprintTabHeader() {
    this.tabIndex = 1;
    this.flyInOutTabs = 'new';
  }

}
