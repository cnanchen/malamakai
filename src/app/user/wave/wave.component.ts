import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-wave',
  templateUrl: './wave.component.html',
  styleUrls: ['./wave.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
