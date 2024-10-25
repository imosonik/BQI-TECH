import { useState } from "react";
import type { ActionResponse } from "@/types/action";

export function useActionState(
  action: (formData: FormData) => Promise<ActionResponse>
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await action(formData);
      if (!response.success) {
        if (typeof response.error === "string") {
          setError(response.error);
        } else if (response.error instanceof Error) {
          setError(response.error.message);
        } else if (typeof response.error === "object") {
          setError(
            Object.entries(response.error)
              .map(([key, messages]) => `${key}: ${messages.join(", ")}`)
              .join("; ")
          );
        } else {
          setError("An error occurred");
        }
      }
      return response;
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unexpected error occurred");
      return {
        success: false,
        message: "Action failed",
        error: e instanceof Error ? e.message : "Unknown error",
      } as ActionResponse;
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, isLoading, error };
}
