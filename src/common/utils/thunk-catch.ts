import { AxiosError } from 'axios';

export const thunkCatch = (e: unknown) => {
  const error = e as Error | AxiosError;
  if (error instanceof AxiosError) {
    return error.response ? error.response.data.message : error.message;
  }
  return `Some error ${error.message}`;
};