interface ApiErrorIssue {
  path: string;
  message: string;
  code: string;
}

interface ApiErrorBody {
  message: string;
  code?: string;
  issues?: ApiErrorIssue[];
}

class ApiError extends Error {
  code?: string;
  issues?: ApiErrorIssue[];

  constructor(
    public status: number,
    public body: ApiErrorBody | null,
  ) {
    super(body?.message ?? "Erro de requisição");
    this.name = "Api error";
    this.code = body?.code;
    this.issues = body?.issues;
  }
}

export { ApiError };
