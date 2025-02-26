export const handleServiceError = (error: unknown, message: string): never => {
    console.error(message, error);
    throw new Error(message);
  };
  