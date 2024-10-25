export type ValidationErrors = { [key: string]: string[] };

export interface ActionResponse {
  success: boolean
  message: string
  data?: unknown
  error?: string | Error | ValidationErrors
}

