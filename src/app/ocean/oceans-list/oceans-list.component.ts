import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { OceanDialogComponent } from '../dialogs/ocean-dialog.component';
import { Ocean } from '../ocean.model';
import { OceanService } from '../ocean.service';
import { SubscribedService } from '../../services/subscribed.service';


@Component({
  selector: 'app-oceans-list',
  templateUrl: './oceans-list.component.html',
  styleUrls: ['./oceans-list.component.scss']
})
export class OceansListComponent implements OnInit, OnDestroy {

  oceans: Ocean[];
  sub: Subscription;
  doesNotHaveSubs$;
  currentUser$;

  constructor(
    public oceanService: OceanService,
    public dialog: MatDialog,
    public subscribedService: SubscribedService
  ) {}

  ngOnInit() {
    this.sub = this.oceanService
      .getUserOceans()
      .subscribe(oceans => (this.oceans = oceans));
    this.doesNotHaveSubs$ = this.subscribedService.doesNotHaveSubs$;
    this.currentUser$ = this.subscribedService.currentUser$;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.oceans, event.previousIndex, event.currentIndex);
    this.oceanService.sortOceans(this.oceans);
  }

  openOceanDialog(): void {
    const dialogRef = this.dialog.open(OceanDialogComponent, {
      width: '400px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.oceanService.createOcean({
          title: result,
          priority: this.oceans.length
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
