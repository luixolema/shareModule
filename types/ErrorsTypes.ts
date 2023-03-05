export enum ERROR_TYPE {
  PageNotFoundErrorType = 'Page not found',
  ServerErrorType = 'Server Error',
  InvalidOperation = 'InvalidOperation',
}

export class PageNotFoundError extends Error {
  constructor(pagUrl?: string) {
    super(`Page not found: (${pagUrl})`);
    this.name = ERROR_TYPE.PageNotFoundErrorType;
  }
}


export class ServerError extends Error {
  constructor() {
    super(ERROR_TYPE.ServerErrorType);
    this.name = ERROR_TYPE.ServerErrorType;
  }
}

export class InvalidOperationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ERROR_TYPE.InvalidOperation;
  }
}
