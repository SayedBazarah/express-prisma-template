import { CustomError } from "./custom.error";

export class NotAuthenticatedError extends CustomError {
  statusCode = 401

  constructor(message?: string) {
    super(message || "Error: not authenticated");
    Object.setPrototypeOf(this, NotAuthenticatedError.prototype);
  }

  serializeError(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message || "Error: not authenticated" }];
  }
}
