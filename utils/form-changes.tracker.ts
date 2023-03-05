import {Subscription} from 'rxjs';
import {AbstractControl} from '@angular/forms';

interface Changes {
  [formControlName: string]: {
    originalValue: any,
    newValue: any
  }
}

type Tracker = {
  [formControlName: string]: {
    subscription: Subscription,
    formControl: AbstractControl
  }
};

export class FormChangesTracker {
  private changes: Changes = {};
  private tracker: Tracker = {};


  public startTrackingChanges(controlName: string, formControl: AbstractControl) {
    this.tracker[controlName]?.subscription.unsubscribe();
    delete this.changes[controlName];

    const originalValue = formControl.value;
    const subscription = formControl.valueChanges.subscribe(newValue =>
      this.registerChanges(controlName, originalValue, newValue)
    );

    this.tracker[controlName] = {subscription, formControl};
  }

  private registerChanges(controlName: string, originalValue: unknown, newValue: unknown) {
    if (newValue !== originalValue) {
      this.changes[controlName] = {newValue, originalValue};
    } else {
      const {[controlName]: removed, ...oldChanges} = this.changes;
      this.changes = oldChanges;
    }
  }

  public restartTracking(formControlsNames: string[]) {
    formControlsNames.forEach(controlName => {
      const formControlToTrack = this.tracker[controlName]?.formControl;

      if (!formControlToTrack) {
        throw new Error('the control ' + controlName + ' is not register for changes tracking');
      }

      this.startTrackingChanges(controlName, formControlToTrack);
    });
  }

  hasChanges(controlNames: string[]): boolean {
    return controlNames.some(controlName => {
      if (!this.tracker[controlName]) {
        throw new Error('the control ' + controlName + ' is not register for changes tracking');
      }
      return Object.keys(this.changes).includes(controlName);
    });
  }

  getOriginalValue(controlName: string): any {
    if (this.hasChanges([controlName])) {
      return this.changes[controlName].originalValue;
    }

    return this.tracker[controlName].formControl.value;
  }

  discardChanges(formControlsNames: string[]) {
    formControlsNames.forEach(controlName => {
      if (this.hasChanges([controlName])) {
        const originalValue = this.getOriginalValue(controlName);
        this.tracker[controlName].formControl.setValue(originalValue);
      }
    });
  }

  getChanges(formControlsNames?: string[]) {
    const result: Record<string, unknown> = {};
    Object.entries(this.changes).forEach(([controlName, values]) => {
      if (formControlsNames) {
        if (formControlsNames.includes(controlName)) {
          result[controlName] = values.newValue;
        }
      } else {
        result[controlName] = values.newValue;
      }
    });

    return result;
  }

  thereAreTrackedChanges(): boolean {
    return !!Object.keys(this.changes).length;
  }
}
