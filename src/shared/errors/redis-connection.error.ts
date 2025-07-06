import { CustomError } from "./custom.error";

export class RedisConnectionError extends CustomError {
  statusCode = 500;
  constructor(message?: string) {
    super(message || "Error connecting to redis");

    Object.setPrototypeOf(this, RedisConnectionError.prototype);
  }

  serializeError() {
    return [
      {
        message: this.message || "Error connecting to redis",
      },
    ];
  }
}
