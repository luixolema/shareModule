import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

interface DecisionDialogData {
  title: string;
  mainMessage: string;
  yesMessage: string;
  noMessage: string;
}

@Component({
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  title: string;
  mainMessage: string;
  yesMessage: string;
  noMessage: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Partial<DecisionDialogData> | undefined,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
  ) {
    this.title = data?.title || "You need to confirm this action.";
    this.mainMessage = data?.mainMessage || "Are you sure?";
    this.yesMessage = data?.yesMessage || "Yes";
    this.noMessage = data?.noMessage || "No";
  }

  ngOnInit(): void {
  }

  close(decision: boolean) {
    this.dialogRef.close(decision);
  }
}
