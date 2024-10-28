import { Request, Response } from "express";
import { logger } from "./logger";

export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
};

export const RESPONSE_MESSAGE = {
  BAD_REQUEST: "Bad Request",
  SERVER_ERROR: "Internal Server Error",
};

export interface errorFormatter {
  details: [
    {
      message: string;
    }
  ];
}

class ResponseFormatter {
  res: Response;
  statusCode: number;
  response: {
    data: {};
    message: string;
    success: boolean;
    errors: {};
    meta?: {};
  };

  constructor(req: Request, res: Response) {
    this.res = res;

    // Default status code
    this.statusCode = STATUS_CODES.SERVER_ERROR;

    // Response Struucture
    this.response = {
      data: {},
      message: "",
      success: false,
      errors: {},
    };
  }

  data(data: object) {
    this.response.data = data;
    return this;
  }

  error(message: string | errorFormatter) {
    typeof message === "string"
      ? (this.response.errors = message)
      : (this.response.errors =
          message?.details && message?.details?.length > 0 ? message?.details[0]?.message : message);

    logger.info(this.response.errors === "object" ? JSON.stringify(this.response.errors) : this.response.errors);
    return this;
  }

  status(code: number) {
    this.statusCode = code;
    return this;
  }

  send() {
    this.res.status(this.statusCode).send(this.response);
    return this;
  }

  get() {
    return this.response;
  }

  success(status: boolean) {
    this.response.success = status;
    return this;
  }

  message(msg: string) {
    this.response.message = msg;
    logger.info(msg);
    return this;
  }
}

export { ResponseFormatter };
