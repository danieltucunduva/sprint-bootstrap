import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SprintFinishedDialogComponent } from './sprint-finished-dialog/sprint-finished-dialog.component';
import { StopSprintDialogComponent } from './stop-sprint-dialog/stop-sprint-dialog.component';
import { SprintService } from '../sprint.service';

@Component({
  selector: 'app-ongoing-sprint',
  templateUrl: './ongoing-sprint.component.html',
  styleUrls: ['./ongoing-sprint.component.css']
})
export class OngoingSprintComponent implements OnInit {
  progressSpinnerValue = 0;
  timer = 0;
  @Output() sprintStop = new EventEmitter<void>();
  cancelSprintDialogNgClass = 'dialog-hide';
  dimmerNgClass = 'dimmer-hide';

  constructor(private dialog: MatDialog, private sprintService: SprintService) { }

  ngOnInit() {
    this.startOrResumeProgressTimer();
  }

  startOrResumeProgressTimer() {
    const shortSprint = this.sprintService.getRunningSprint().duration < 180 ? true : false;
    const percentStepSize = shortSprint ? 1 : 0.1;
    const timeFactor = shortSprint ? 10 : 1;
    this.timer = window.setInterval(
      () => {
        if (this.progressSpinnerValue >= 100) {
          clearInterval(this.timer);
          this.sprintService.finishSprint(true, this.progressSpinnerValue);
          const dialogRef = this.dialog.open(SprintFinishedDialogComponent, { data: { sprint: this.sprintService.getRunningSprint() } });
          if (this.sprintService.getRunningSprint().notify) {
            const notification = new Notification('≡Sprint', {
              body: 'Your sprint is finished.',
              icon: './assets/logo_square_white.jpg',
              dir: 'auto'
            });
            setTimeout(function () {
              notification.close();
            }, 10000);
            document.getElementsByTagName('audio')[0].play();
          }
        } else {
          this.progressSpinnerValue = Number.parseFloat((this.progressSpinnerValue + percentStepSize).toFixed(1));
        }
      }, this.sprintService.getRunningSprint().duration * timeFactor
    );
  }

  onClickStopSprint() {
    this.cancelSprintDialogNgClass = 'dialog-show';
    this.dimmerNgClass = 'dimmer-show';
    clearInterval(this.timer);
  }

  onClickStopSprintConfirm() {
    this.sprintService.finishSprint(false, this.progressSpinnerValue);
    this.cancelSprintDialogNgClass = 'dialog-hide';
    this.dimmerNgClass = 'dimmer-hide';
  }

  onClickStopSprintCancel() {
    this.startOrResumeProgressTimer();
    this.cancelSprintDialogNgClass = 'dialog-hide';
    this.dimmerNgClass = 'dimmer-hide';
  }

}
