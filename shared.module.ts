import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SpinnerComponent} from './componenents/spinner/spinner.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from './componenents/decision-dialog/confirmation-dialog.component';
import {MatButtonModule} from "@angular/material/button";
import {DonateButtonComponent} from "./componenents/donate-button/donate-button.component";
import {MatIconModule} from "@angular/material/icon";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatTooltipModule} from "@angular/material/tooltip";
import {TranslocoModule} from "@ngneat/transloco";
import {TooltipFeedbackComponent} from "./componenents/tooltip-feedback/tooltip-feedback.component";

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, DragDropModule, MatTooltipModule, TranslocoModule],
  declarations: [
    SpinnerComponent,
    ConfirmationDialogComponent,
    DonateButtonComponent,
    TooltipFeedbackComponent
  ],
  exports: [
    CommonModule,
    SpinnerComponent,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    DonateButtonComponent,
    TooltipFeedbackComponent
  ]
})
export class SharedModule {
}
