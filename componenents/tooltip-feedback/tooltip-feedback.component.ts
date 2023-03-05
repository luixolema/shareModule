import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {distinctUntilChanged, Observable} from "rxjs";
import {MatTooltip} from "@angular/material/tooltip";


@Component({
  selector: 'app-tooltip-feedback',
  templateUrl: './tooltip-feedback.component.html',
  styleUrls: ['./tooltip-feedback.component.scss']
})
export class TooltipFeedbackComponent implements OnInit, OnChanges {

  @Input() message!: string | Observable<string>;
  @Input() delay: number = 3000;
  @Input() showTooltipOnCLick = true;
  @ViewChild('tooltip') tooltip!: MatTooltip
  disableTooltip = true
  text = 'COjonneee'

  constructor() {
  }


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.message instanceof Observable) {
      this.message.pipe(
        distinctUntilChanged()
      ).subscribe((newText) => {
        this.text = newText;
        this.showTooltip()
      })
    } else {
      this.text = this.message;
    }
  }

  click() {
    if (this.showTooltipOnCLick) {
      this.showTooltip();
    }
  }


  showTooltip() {
    this.disableTooltip = false;
    this.tooltip.show();
    setTimeout(() => {
      this.tooltip.hide();
      this.disableTooltip = true;
    }, this.delay)
  }
}
