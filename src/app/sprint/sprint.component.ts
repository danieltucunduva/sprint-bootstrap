import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SprintService } from './sprint.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { MatDialog } from '@angular/material';
import { DeleteDataDialogComponent } from './past-sprints/delete-data-dialog/delete-data-dialog.component';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit, AfterViewInit {
  ongoingSprint = false;
  sprintSubscription: Subscription;
  tabIndex = 0;
  pastSprintsSubscription: Subscription;
  availableSprintsSubscription: Subscription;
  pastSprintsNgClass = 'initPastSprints';
  newSprintNgClass = 'hideNewSprint';

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
        this.tabIndex = 0;
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

  ngAfterViewInit() {
    setTimeout(() => { this.pastSprintsNgClass = 'showPastSprints'; }, 400);
  }

  sprintStop() {
    this.tabIndex = 0;
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
    if (this.tabIndex === 1) {
      this.newSprintNgClass = 'hideNewSprint';
      this.pastSprintsNgClass = 'showPastSprints';
    }
    this.tabIndex = 0;
  }

  onClickNewSprintTabHeader() {
    if (this.tabIndex === 0) {
      this.pastSprintsNgClass = 'hidePastSprints';
      this.newSprintNgClass = 'showNewSprint';
      setTimeout(() => { this.pastSprintsNgClass = 'transparent'; }, 400);
    }
    this.tabIndex = 1;
  }

}
