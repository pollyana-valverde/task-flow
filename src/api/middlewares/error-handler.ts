import { APIError } from "better-auth/api";
import type { ErrorHandler } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { ZodError } from "zod";
import { AppError } from "@/api/utils/app-error";

const errorHandler: ErrorHandler = (error, c) => {
  if (error instanceof AppError) {
    return c.json(
      { message: error.message },
      error.statusCode as ContentfulStatusCode,
    );
  }

  if (error instanceof ZodError) {
    return c.json(
      {
        message: "Validation error",
        issues: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
          code: issue.code,
        })),
      },
      400,
    );
  }

  if (error instanceof APIError) {
    return c.json(
      {
        message: error.message,
        code: error.body?.code,
      },
      error.status as ContentfulStatusCode,
    );
  }

  console.error(error);

  return c.json({ message: "Internal server error" }, 500);
};

export { errorHandler };
