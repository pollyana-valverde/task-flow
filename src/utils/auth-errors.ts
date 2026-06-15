import type { RawError } from "better-auth";

function translateAuthError(code: RawError["code"]) {
  const errorMessages: Record<
    string,
    {
      field: "email" | "password" | `root.${string}` | "root";
      message: string;
    }
  > = {
    USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: {
      field: "email",
      message: "Email já cadastrado.",
    },
    INVALID_PASSWORD: { field: "root", message: "Email ou senha inválidos." },
    INVALID_EMAIL: { field: "root", message: "Email ou senha inválidos." },
    INVALID_EMAIL_OR_PASSWORD: {
      field: "root",
      message: "Email ou senha inválidos.",
    },
    USER_NOT_FOUND: { field: "root", message: "Usuário não encontrado." },
    ACCOUNT_NOT_FOUND: { field: "root", message: "Conta não encontrada." },
    SESSION_EXPIRED: {
      field: "root",
      message: "Sua sessão expirou. Por favor, faça login novamente.",
    },
    TOO_MANY_ATTEMPTS_TRY_LATER: {
      field: "root",
      message:
        "Muitas tentativas de login. Por favor, tente novamente mais tarde.",
    },
    INVALID_TOKEN: {
      field: "root",
      message: "Token inválido. Por favor, faça login novamente.",
    },
    UNAUTHORIZED: {
      field: "root",
      message: "Acesso não autorizado. Por favor, faça login.",
    },
  };

  return {
    field: errorMessages[code]?.field || "root",
    message:
      errorMessages[code]?.message ||
      "Ocorreu um erro. Por favor, tente novamente.",
  };
}

export { translateAuthError };
