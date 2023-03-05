import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'tooltip-feed-back',
  templateUrl: './tooltip-feed-back.component.html',
  styleUrls: ['./tooltip-feed-back.component.scss']
})
export class TooltipFeedBackComponent implements OnInit {

  @ViewChild('tooltipElement') tooltipElement: MatTooltip;
  @Input() tooltip!: string;
  disable = true;
  private timeoutShow: number;
  private timeoutHide: number;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('click')
  showTooltip() {
    this.disable = false;
    if (this.timeoutHide){
      window.clearTimeout(this.timeoutShow);
      window.clearTimeout(this.timeoutHide);
    }
    this.timeoutShow = window.setTimeout(() => {
      this.tooltipElement.show(0);
    }, 10);
    this.timeoutHide = window.setTimeout(() => {
      this.disable = true;
    }, 2100);
  }

}
