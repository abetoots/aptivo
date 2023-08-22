import { z } from "zod";

// Codes that can be returned to the client
export const clientCodes = z.enum([
  "required",
  "invalid",
  "not_found",
  "duplicate",
  "unauthorized",
  "forbidden",
  "limit_exceeded",
  "failed",
]);

// Codes for internal server errors. Should not be returned to the client but to the logs
export const serverCodes = z.enum(["internal", "unknown", "unavailable"]);

export const errorCodes = z.union([clientCodes, serverCodes]);

export type ErrorCodes = z.infer<typeof errorCodes>;

export class BaseAppError extends Error {
  code: ErrorCodes;
  detail?: string;
  constructor(code: ErrorCodes, message: string, detail?: string) {
    super(message);
    this.code = code;
    this.detail = detail;
  }
}

export class PropertyRequiredError extends BaseAppError {
  property: string;
  constructor(property: string) {
    super("required", "Missing property: " + property);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}

export class PropertiesRequiredError extends BaseAppError {
  constructor(properties: string[]) {
    super("required", `Missing properties: ${JSON.stringify(properties)}`);
    this.name = "PropertiesRequiredError";
  }
}
