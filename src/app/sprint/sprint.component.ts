import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SprintService } from './sprint.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { MatDialog } from '@angular/material';
import { DeleteDataDialogComponent } from './past-sprints/delete-data-dialog/delete-data-dialog.component';
import { ISprint } from './sprint.model';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit, AfterViewInit {
  ongoingSprint = false;
  tabIndex = 0;
  sprintSubscription: Subscription;
  finishedSprintSubscription: Subscription;
  pastSprintsSubscription: Subscription;
  availableSprintsSubscription: Subscription;
  pastSprintsNgClass = 'initPastSprints';
  newSprintNgClass = 'hideNewSprint';
  finishedSprintName = '';
  finishedSprint: ISprint;

  constructor(
    private sprintService: SprintService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.sprintSubscription = this.sprintService.sprintChanged.subscribe(sprint => {
      if (sprint) {
        this.newSprintNgClass = 'hideNewSprint';
        setTimeout(() => { this.ongoingSprint = true; }, 400);
      } else {
        this.newSprintNgClass = 'hideNewSprint';
        this.pastSprintsNgClass = 'hidePastSprints';
        this.tabIndex = 0;
        this.ongoingSprint = false;
        setTimeout(() => {
          this.pastSprintsNgClass = 'showPastSprints';
        }, 200);
      }
    });
    this.finishedSprintSubscription = this.sprintService.finishedSprintChanged.subscribe(sprint => {
      if (sprint) {
        this.finishedSprint = { ...sprint };
        this.finishedSprintName = this.sprintService.getFullName(this.finishedSprint);
      } else {
        this.tabIndex = 1;
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

  onClickCloseFinishedSprintDialog() {
    this.finishedSprint = null;
    this.finishedSprintName = null;
  }

}
