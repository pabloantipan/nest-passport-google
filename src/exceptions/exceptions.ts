import {
  MULTI_SESSION_IS_NOT_ALLOWED,
  SESSION_DOES_NOT_EXIST,
  USER_MAX_SESSIONS_REACHED,
  USER_SESSION_HAS_JUST_TERMINATED,
  USER_SESSION_WAS_ALREADY_TERMINATED,
} from '@constants/response-codes.constants';

export class SessionHasJustTerminated extends Error {
  private _statusCode: number = USER_SESSION_HAS_JUST_TERMINATED;
  constructor(message: string = undefined) {
    super(message);
    if (!message) this.message = 'Session was just terminated';
    this.name = 'SessionHasJustTerminated';
  }

  public get statusCode(): number {
    return this._statusCode;
  }
}

export class SessionWasAlreadyTerminated extends Error {
  private _statusCode: number = USER_SESSION_WAS_ALREADY_TERMINATED;

  constructor(message: string = undefined) {
    super(message);
    if (!message) this.message = 'Session was already terminated';
    this.name = 'SessionWasAlreadyTerminated';
  }

  public get statusCode(): number {
    return this._statusCode;
  }
}

export class MaxMultiSessionReached extends Error {
  private _statusCode: number = USER_MAX_SESSIONS_REACHED;

  constructor(message: string = undefined) {
    super(message);
    if (!message) this.message = 'Maximum multi session limit reached';
    this.name = 'MaxMultiSessionReached';
  }

  public get statusCode(): number {
    return this._statusCode;
  }
}

export class MultiSessionIsNotAllowed extends Error {
  private _statusCode: number = MULTI_SESSION_IS_NOT_ALLOWED;

  constructor(message: string = undefined) {
    super(message);
    if (!message) this.message = 'Multi session is not allowed';
    this.name = 'MultiSessionIsNotAllowed';
  }

  public get statusCode(): number {
    return this._statusCode;
  }
}

export class SessionDoesNotExist extends Error {
  private _statusCode: number = SESSION_DOES_NOT_EXIST;

  constructor(message: string = undefined) {
    super(message);
    if (!message) this.message = '';
    this.name = 'SessionDoesNotExist';
  }

  public get statusCode(): number {
    return this._statusCode;
  }
}
