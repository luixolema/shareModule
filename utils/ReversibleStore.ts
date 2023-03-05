import {BehaviorSubject, Observable} from 'rxjs';

/**
 * This class makes easier to simulate a store.
 * Important: Always on EVERY change of the store, commit the changes to keep the listeners updated.
 */
export class ReversibleStore<T extends Object> {
  public store$: Observable<T>;
  private previousState: T;
  private privateState$: BehaviorSubject<T>;

  constructor(initialState: T, debugMode: boolean = false) {
    this.privateState$ = new BehaviorSubject<T>(initialState);
    this.previousState = this.privateState$.getValue();
    this.store$ = this.privateState$.asObservable();

    if (debugMode){
      this.registerChanges();
    }
  }

  private registerChanges() {
    this.privateState$.subscribe((newState) => {
      console.info("ReversibleStore change from: ", this.previousState, " to: ", newState)
    })
  }

  protected commitChanges(changes: Partial<T>): void {
    this.previousState = {...this.privateState$.getValue()};
    const newState = {...this.previousState, ...changes};
    this.privateState$.next(newState);
  }

  protected revert(): void {
    this.privateState$.next(this.previousState);
  }

  public getStore(): T {
    return this.privateState$.getValue();
  }

}
